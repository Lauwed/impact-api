<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TypeSocialStatusRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TypeSocialStatusRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['personSocialStatus:read']],
    outputFormats: ['jsonld' => ['application/ld+json']],
)]
class TypeSocialStatus
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['personSocialStatus:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['personSocialStatus:read'])]
    private ?string $name = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
}
