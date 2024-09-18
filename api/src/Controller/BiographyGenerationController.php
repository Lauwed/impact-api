<?php

namespace App\Controller;

use App\Entity\Person;
use App\Service\OpenAIService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class BiographyGenerationController extends AbstractController
{
    private OpenAIService $openAIService;
    private EntityManagerInterface $entityManager;

    public function __construct(OpenAIService $openAIService, EntityManagerInterface $entityManager)
    {
        $this->openAIService = $openAIService;
        $this->entityManager = $entityManager;
    }

    #[Route('/people/{id}/generate-biography', name: 'generate_biography', methods: ['POST'])]
    public function generateBiography(int $id, Request $request): JsonResponse
    {
        // Récupérer l'entité Person à partir de l'ID
        $person = $this->entityManager->getRepository(Person::class)->find($id);

        if (!$person) {
            return new JsonResponse(['error' => 'Person not found'], 404);
        }

        // Créer le prompt pour générer la biographie
        $prompt = $this->createPrompt($person);

        // Appeler le service OpenAI pour générer la biographie
        $biography = $this->openAIService->getResponse($prompt);

        // Retourner la biographie générée en réponse JSON
        return new JsonResponse(['biography' => $biography]);
    }

    private function createPrompt(Person $person): string
    {
        // Collecting information from the Person entity
        $name = $person->getName();
        $identityFields = $person->getPersonIdentityFields();
        $jobs = $person->getPersonJobs();
        $relatives = $person->getPersonRelatives();
        $socialStatuses = $person->getPersonSocialStatuses();
        $schools = $person->getPersonSchools();
        $categories = $person->getPersonCategories();
        $achievements = $person->getAchievements();

        // Build the prompt based on the collected data
        $prompt = "Generate a detailed biography for a person with the following details:\n";
        $prompt .= "Name: $name\n";
        $prompt .= "Identity Fields: " . $this->formatCollection($identityFields) . "\n";
        $prompt .= "Jobs: " . $this->formatCollection($jobs, 'jobs') . "\n";
        $prompt .= "Relatives: " . $this->formatCollection($relatives, 'relatives') . "\n";
        $prompt .= "Social Statuses: " . $this->formatCollection($socialStatuses, 'socialstatuses') . "\n";
        $prompt .= "Schools: " . $this->formatCollection($schools, 'schools') . "\n";
        $prompt .= "Categories: " . $this->formatCollection($categories, 'categories') . "\n";
        $prompt .= "Achievements: " . $this->formatCollection($achievements, 'achievements') . "\n";

        return $prompt;
    }

    private function formatCollection($collection, string $collectionName = ''): string
    {
        $formatted = [];
        foreach ($collection as $item) {
            if($collectionName == 'jobs') $formatted[] = $item->getCompany()->getName() . ':' . $item->getJob();
            else if($collectionName == 'relatives') $formatted[] = $item->getTypeRelative()->getName() . ':' . $item->getName();
            else if($collectionName == 'socialstatuses') $formatted[] = $item->getTypeSocialStatus()->getName();
            else if($collectionName == 'schools') $formatted[] = $item->getSchool()->getName() . ':' . $item->getDegree();
            else if($collectionName == 'categories') $formatted[] = $item->getCategory()->getName();
            else if($collectionName == 'achievements') $formatted[] = $item->getContent();
            else $formatted[] = $item->getTypeIdentityField()->getName() . ':' . $item->getValue();
        }
        return implode(', ', $formatted);
    }
}
