<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Filter\PersonIdentityFieldIdFilter;
use App\Repository\PersonIdentityFieldRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PersonIdentityFieldRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['identityField:read']],
    outputFormats: ['jsonld' => ['application/ld+json']],
    operations: [
        new Get(security: "is_granted('PUBLIC_ACCESS')"),
        new GetCollection(security: "is_granted('PUBLIC_ACCESS')"),
        new Post(security: "is_granted('ROLE_USER')"),
        new Put(security: "is_granted('ROLE_USER')"),
        new Delete(security: "is_granted('ROLE_USER')")
    ]
)]
#[ApiFilter(PersonIdentityFieldIdFilter::class)]
class PersonIdentityField
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('identityField:read')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('identityField:read')]
    private ?string $value = null;

    #[ORM\ManyToOne()]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('identityField:read')]
    private ?TypeIdentityField $typeIdentityField = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('identityField:read')]
    private ?Source $source = null;

    #[ORM\ManyToOne(inversedBy: 'personIdentityFields')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('identityField:read')]
    private ?Person $person = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getTypeIdentityField(): ?TypeIdentityField
    {
        return $this->typeIdentityField;
    }

    public function setTypeIdentityField(?TypeIdentityField $typeIdentityField): static
    {
        $this->typeIdentityField = $typeIdentityField;

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

    public function getPerson(): ?Person
    {
        return $this->person;
    }

    public function setPerson(?Person $person): static
    {
        $this->person = $person;

        return $this;
    }
}
