<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PersonSocialStatusRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PersonSocialStatusRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['personSocialStatus:read']],
    paginationEnabled: false
)]
class PersonSocialStatus
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['personSocialStatus:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'personSocialStatuses')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['personSocialStatus:read'])]
    private ?Person $person = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['personSocialStatus:read'])]
    private ?TypeSocialStatus $typeSocialStatus = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['personSocialStatus:read'])]
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

    public function getTypeSocialStatus(): ?TypeSocialStatus
    {
        return $this->typeSocialStatus;
    }

    public function setTypeSocialStatus(?TypeSocialStatus $typeSocialStatus): static
    {
        $this->typeSocialStatus = $typeSocialStatus;

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
