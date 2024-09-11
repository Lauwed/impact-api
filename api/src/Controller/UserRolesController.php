<?php
// src/Controller/UserRolesController.php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class UserRolesController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private SerializerInterface $serializer,
        private AuthorizationCheckerInterface $authorizationChecker
    ) {}

    public function __invoke(Request $request, User $data): JsonResponse
    {
        // Vérifier les autorisations
        if (!$this->authorizationChecker->isGranted('ROLE_ADMIN')) {
            return new JsonResponse(['error' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }

        // Récupérer les rôles depuis la requête
        $roles = $request->request->get('roles');

        if (!is_array($roles)) {
            return new JsonResponse(['error' => 'Invalid roles format'], Response::HTTP_BAD_REQUEST);
        }

        // Mettre à jour les rôles de l'utilisateur
        $data->setRoles($roles);
        $this->entityManager->flush();

        // Normaliser et retourner l'utilisateur mis à jour
        $user = $this->serializer->normalize($data, null, ['groups' => ['user:read']]);
        return new JsonResponse($user, Response::HTTP_OK);
    }
}
