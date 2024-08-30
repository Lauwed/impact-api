<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TypeIdentityFieldRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TypeIdentityFieldRepository::class)]
#[ApiResource]
class TypeIdentityField
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, PersonIdentityField>
     */
    #[ORM\OneToMany(mappedBy: 'typeIdentityField', targetEntity: PersonIdentityField::class)]
    private Collection $personIdentityFields;

    public function __construct()
    {
        $this->personIdentityFields = new ArrayCollection();
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
     * @return Collection<int, PersonIdentityField>
     */
    public function getPersonIdentityFields(): Collection
    {
        return $this->personIdentityFields;
    }

    public function addPersonIdentityField(PersonIdentityField $personIdentityField): static
    {
        if (!$this->personIdentityFields->contains($personIdentityField)) {
            $this->personIdentityFields->add($personIdentityField);
            $personIdentityField->setTypeIdentityField($this);
        }

        return $this;
    }

    public function removePersonIdentityField(PersonIdentityField $personIdentityField): static
    {
        if ($this->personIdentityFields->removeElement($personIdentityField)) {
            // set the owning side to null (unless already changed)
            if ($personIdentityField->getTypeIdentityField() === $this) {
                $personIdentityField->setTypeIdentityField(null);
            }
        }

        return $this;
    }
}
