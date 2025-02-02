<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PersonCategoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PersonCategoryRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['personCategory:read']],
    paginationEnabled: false
)]
class PersonCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('personCategory:read')]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'personCategories')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('personCategory:read')]
    private ?Person $person = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('personCategory:read')]
    private ?Category $category = null;

    #[ORM\ManyToOne]
    #[Groups('personCategory:read')]
    private ?Source $source = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

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
