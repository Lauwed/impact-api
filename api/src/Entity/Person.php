<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PersonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PersonRepository::class)]
#[ApiResource]
class Person
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $romanizedName = null;

    /**
     * @var Collection<int, PersonIdentityField>
     */
    #[ORM\OneToMany(mappedBy: 'person', targetEntity: PersonIdentityField::class)]
    private Collection $personIdentityFields;

    /**
     * @var Collection<int, PersonJob>
     */
    #[ORM\OneToMany(mappedBy: 'person', targetEntity: PersonJob::class)]
    private Collection $personJobs;

    /**
     * @var Collection<int, PersonRelative>
     */
    #[ORM\OneToMany(mappedBy: 'person', targetEntity: PersonRelative::class)]
    private Collection $personRelatives;

    /**
     * @var Collection<int, PersonSocialStatus>
     */
    #[ORM\OneToMany(mappedBy: 'person', targetEntity: PersonSocialStatus::class)]
    private Collection $personSocialStatuses;

    /**
     * @var Collection<int, PersonSchool>
     */
    #[ORM\OneToMany(mappedBy: 'person', targetEntity: PersonSchool::class)]
    private Collection $personSchools;

    /**
     * @var Collection<int, PersonCategory>
     */
    #[ORM\OneToMany(mappedBy: 'person', targetEntity: PersonCategory::class)]
    private Collection $personCategories;

    public function __construct()
    {
        $this->personIdentityFields = new ArrayCollection();
        $this->personJobs = new ArrayCollection();
        $this->personRelatives = new ArrayCollection();
        $this->personSocialStatuses = new ArrayCollection();
        $this->personSchools = new ArrayCollection();
        $this->personCategories = new ArrayCollection();
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

    public function getRomanizedName(): ?string
    {
        return $this->romanizedName;
    }

    public function setRomanizedName(?string $romanizedName): static
    {
        $this->romanizedName = $romanizedName;

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
            $personIdentityField->setPerson($this);
        }

        return $this;
    }

    public function removePersonIdentityField(PersonIdentityField $personIdentityField): static
    {
        if ($this->personIdentityFields->removeElement($personIdentityField)) {
            // set the owning side to null (unless already changed)
            if ($personIdentityField->getPerson() === $this) {
                $personIdentityField->setPerson(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PersonJob>
     */
    public function getPersonJobs(): Collection
    {
        return $this->personJobs;
    }

    public function addPersonJob(PersonJob $personJob): static
    {
        if (!$this->personJobs->contains($personJob)) {
            $this->personJobs->add($personJob);
            $personJob->setPerson($this);
        }

        return $this;
    }

    public function removePersonJob(PersonJob $personJob): static
    {
        if ($this->personJobs->removeElement($personJob)) {
            // set the owning side to null (unless already changed)
            if ($personJob->getPerson() === $this) {
                $personJob->setPerson(null);
            }
        }

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
            $personRelative->setPerson($this);
        }

        return $this;
    }

    public function removePersonRelative(PersonRelative $personRelative): static
    {
        if ($this->personRelatives->removeElement($personRelative)) {
            // set the owning side to null (unless already changed)
            if ($personRelative->getPerson() === $this) {
                $personRelative->setPerson(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PersonSocialStatus>
     */
    public function getPersonSocialStatuses(): Collection
    {
        return $this->personSocialStatuses;
    }

    public function addPersonSocialStatus(PersonSocialStatus $personSocialStatus): static
    {
        if (!$this->personSocialStatuses->contains($personSocialStatus)) {
            $this->personSocialStatuses->add($personSocialStatus);
            $personSocialStatus->setPerson($this);
        }

        return $this;
    }

    public function removePersonSocialStatus(PersonSocialStatus $personSocialStatus): static
    {
        if ($this->personSocialStatuses->removeElement($personSocialStatus)) {
            // set the owning side to null (unless already changed)
            if ($personSocialStatus->getPerson() === $this) {
                $personSocialStatus->setPerson(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PersonSchool>
     */
    public function getPersonSchools(): Collection
    {
        return $this->personSchools;
    }

    public function addPersonSchool(PersonSchool $personSchool): static
    {
        if (!$this->personSchools->contains($personSchool)) {
            $this->personSchools->add($personSchool);
            $personSchool->setPerson($this);
        }

        return $this;
    }

    public function removePersonSchool(PersonSchool $personSchool): static
    {
        if ($this->personSchools->removeElement($personSchool)) {
            // set the owning side to null (unless already changed)
            if ($personSchool->getPerson() === $this) {
                $personSchool->setPerson(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PersonCategory>
     */
    public function getPersonCategories(): Collection
    {
        return $this->personCategories;
    }

    public function addPersonCategory(PersonCategory $personCategory): static
    {
        if (!$this->personCategories->contains($personCategory)) {
            $this->personCategories->add($personCategory);
            $personCategory->setPerson($this);
        }

        return $this;
    }

    public function removePersonCategory(PersonCategory $personCategory): static
    {
        if ($this->personCategories->removeElement($personCategory)) {
            // set the owning side to null (unless already changed)
            if ($personCategory->getPerson() === $this) {
                $personCategory->setPerson(null);
            }
        }

        return $this;
    }
}
