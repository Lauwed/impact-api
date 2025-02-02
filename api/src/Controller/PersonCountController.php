<?php

namespace App\Controller;

use App\Repository\PersonRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PersonCountController extends AbstractController
{ 
    private $personRepository;

    public function __construct(PersonRepository $personRepository)
    {
        $this->personRepository = $personRepository;
    }

    public function __invoke(): JsonResponse
    {
        $count = $this->personRepository->countAllPersons();
        return new JsonResponse(['total' => $count]);
    }
}
