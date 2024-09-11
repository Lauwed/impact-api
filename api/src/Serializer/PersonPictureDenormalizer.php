<?php
// src/Serializer/PersonPictureDenormalizer.php

namespace App\Serializer;

use ApiPlatform\Api\IriConverterInterface;
use App\Entity\PersonPicture;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;

class PersonPictureDenormalizer implements DenormalizerInterface, DenormalizerAwareInterface
{
    use DenormalizerAwareTrait;

    public function denormalize($data, $class, $format = null, array $context = [])
    {
        // Check and convert the `main` field to boolean
        if (isset($data['main']) && $data['main'] == 'true') {
            $data['main'] = filter_var($data['main'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        }

        // Call the default denormalizer to handle the rest of the fields
        return $this->denormalizer->denormalize($data, $class, $format, $context + [__CLASS__ => true]);
    }

    public function supportsDenormalization($data, $type, $format = null, array $context = []): bool
    {
        return \in_array($format, ['json', 'jsonld'], true) && is_a($type, PersonPicture::class, true) && !empty($data['main']) && !isset($context[__CLASS__]);
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            'object' => null,
            '*' => false,
            PersonPicture::class => true
        ];
    }
}
