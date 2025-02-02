<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PersonRelativeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PersonRelativeRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['personRelative:read']],
    paginationEnabled: false
)]
class PersonRelative
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['personRelative:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['personRelative:read'])]
    private ?string $name = null;

    #[ORM\Column(name: "is_biological")]
    #[Groups(['personRelative:read'])]
    private ?bool $biological = null;

    #[ORM\ManyToOne(inversedBy: 'personRelatives')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['personRelative:read'])]
    private ?Person $person = null;

    #[ORM\ManyToOne(inversedBy: 'personRelatives')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['personRelative:read'])]
    private ?TypeRelative $typeRelative = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['personRelative:read'])]
    private ?Source $source = null;

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

    public function isBiological(): ?bool
    {
        return $this->biological;
    }

    public function setBiological(bool $biological): static
    {
        $this->biological = $biological;

        return $this;
    }

    public function getPerson(): ?Person
    {
        return $this->person;
    }

    public function setPerson(?Person $person): static
    {
        $this->person = $person;

        return $this;
    }

    public function getTypeRelative(): ?TypeRelative
    {
        return $this->typeRelative;
    }

    public function setTypeRelative(?TypeRelative $typeRelative): static
    {
        $this->typeRelative = $typeRelative;

        return $this;
    }

    public function getSource(): ?Source
    {
        return $this->source;
    }

    public function setSource(?Source $source): static
    {
        $this->source = $source;

        return $this;
    }
}
