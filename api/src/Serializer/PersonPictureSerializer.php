<?php

namespace App\Serializer;

use ApiPlatform\Serializer\AbstractItemNormalizer;
use App\Entity\PersonPicture;

class PersonPictureSerializer extends AbstractItemNormalizer
{
    public function denormalize(mixed $data, string $class, ?string $format = null, array $context = []): mixed
    {
        if (isset($data['main'])) {
            $data['main'] = $data['main'] === 'true';
        }

        return parent::denormalize($data, $class, $format, $context);
    }
}
