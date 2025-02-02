<?php

namespace App\Controller;

use App\Entity\Person;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MainPictureController extends AbstractController
{
    public function __invoke(Person $person): JsonResponse
    {
        // Fetch all pictures for the person
        $personPictures = $person->getPersonPictures();

        // Find the picture marked as 'main'
        $mainPicture = null;
        foreach ($personPictures as $picture) {
            if ($picture->isMain()) {
                $mainPicture = $picture;
                break;
            }
        }

        if (!$mainPicture) {
            throw new NotFoundHttpException('No main picture found for this person.');
        }

        // return $this->json([
        //     'id' => $mainPicture->getId(),
        //     'title' => $mainPicture->getTitle(),
        //     'alt' => $mainPicture->getAlt(),
        //     'contentUrl' => $mainPicture->contentUrl ?? ($mainPicture->getImage() ? $mainPicture->getImage()->getFilePath() : null),
        // ]);
        return $this->json($mainPicture);
    }
}
