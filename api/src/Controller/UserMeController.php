<?php
// src/Controller/UserMeController.php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserMeController extends AbstractController
{
    public function __construct(private TokenStorageInterface $tokenStorage)
    {
    }

    public function __invoke(): JsonResponse
    {
        // Récupérer l'utilisateur courant à partir du token
        $token = $this->tokenStorage->getToken();

        if (!$token || !$token->getUser() instanceof UserInterface) {
            return new JsonResponse(['error' => 'User not found'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $token->getUser();

        // Normalement, l'utilisateur est sérialisé automatiquement via ApiPlatform
        return $this->json($user, Response::HTTP_OK, [], ['groups' => ['user:read']]);
    }
}
