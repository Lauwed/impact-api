<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TypeRelativeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TypeRelativeRepository::class)]
#[ApiResource(
    outputFormats: ['jsonld' => ['application/ld+json']],
    normalizationContext: ['groups' => ['personRelative:read']],
)]
class TypeRelative
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['personRelative:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['personRelative:read'])]
    private ?string $name = null;

    /**
     * @var Collection<int, PersonRelative>
     */
    #[ORM\OneToMany(mappedBy: 'typeRelative', targetEntity: PersonRelative::class)]
    private Collection $personRelatives;

    public function __construct()
    {
        $this->personRelatives = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, PersonRelative>
     */
    public function getPersonRelatives(): Collection
    {
        return $this->personRelatives;
    }

    public function addPersonRelative(PersonRelative $personRelative): static
    {
        if (!$this->personRelatives->contains($personRelative)) {
            $this->personRelatives->add($personRelative);
            $personRelative->setTypeRelative($this);
        }

        return $this;
    }

    public function removePersonRelative(PersonRelative $personRelative): static
    {
        if ($this->personRelatives->removeElement($personRelative)) {
            // set the owning side to null (unless already changed)
            if ($personRelative->getTypeRelative() === $this) {
                $personRelative->setTypeRelative(null);
            }
        }

        return $this;
    }
}
