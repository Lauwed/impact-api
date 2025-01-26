<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Person;
use App\Service\OpenAIService;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class PersonBiographyProcessor implements ProcessorInterface
{
    private OpenAIService $openAIService;

    public function __construct(
        #[Autowire(service: 'App\Service\OpenAIService')]
        OpenAIService $openAIService
    ) {
        $this->openAIService = $openAIService;
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
        if(!$identityFields->isEmpty())$prompt .= "Identity Fields: " . $this->formatCollection($identityFields) . "\n";
        if(!$jobs->isEmpty())$prompt .= "Jobs: " . $this->formatCollection($jobs, 'jobs') . "\n";
        if(!$relatives->isEmpty())$prompt .= "Relatives: " . $this->formatCollection($relatives, 'relatives') . "\n";
        if(!$socialStatuses->isEmpty()) $prompt .= "Social Statuses: " . $this->formatCollection($socialStatuses, 'socialstatuses') . "\n";
        if(!$schools->isEmpty())$prompt .= "Schools: " . $this->formatCollection($schools, 'schools') . "\n";
        if(!$categories->isEmpty())$prompt .= "Categories: " . $this->formatCollection($categories, 'categories') . "\n";
        if(!$achievements->isEmpty())$prompt .= "Achievements: " . $this->formatCollection($achievements, 'achievements') . "\n";

        return $prompt;
    }

    private function formatCollection($collection, string $collectionName = ''): string
    {
        $formatted = [];
        foreach ($collection as $item) {
            if ($collectionName == 'jobs')
                $formatted[] = $item->getCompany()->getName() . ':' . $item->getJob();
            else if ($collectionName == 'relatives')
                $formatted[] = $item->getTypeRelative()->getName() . ':' . $item->getName();
            else if ($collectionName == 'socialstatuses')
                $formatted[] = $item->getTypeSocialStatus()->getName();
            else if ($collectionName == 'schools')
                $formatted[] = $item->getSchool()->getName() . ':' . $item->getDegree();
            else if ($collectionName == 'categories')
                $formatted[] = $item->getCategory()->getName();
            else if ($collectionName == 'achievements')
                $formatted[] = $item->getContent();
            else
                $formatted[] = $item->getTypeIdentityField()->getName() . ':' . $item->getValue();
        }
        return implode(', ', $formatted);
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        // Vérifie si l'entité est une instance de Person
        if (!$data instanceof Person) {
            return $data;
        }

        // Récupère les paramètres depuis le contexte de la requête
        $temperature = $context['request']->query->get('temperature') ?? 1.0; // Valeur par défaut
        $maxTokens = $context['request']->query->get('maxtokens') ?? 2048; // Valeur par défaut

        $prompt = $this->createPrompt($data);

        // Utilise le service OpenAI pour obtenir la biographie
        $biography = $this->openAIService->getResponse($prompt, $temperature, $maxTokens);
        $data->setBiography($biography);

        // Stocke le prompt dans l'attribut non persistant
        $data->setGeneratedPrompt($prompt);

        return $data;
    }
}
