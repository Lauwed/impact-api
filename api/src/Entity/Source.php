<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SourceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SourceRepository::class)]
#[ApiResource]
class Source
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?bool $is_digital = null;

    #[ORM\Column]
    private ?bool $is_verified = null;

    #[ORM\ManyToOne(inversedBy: 'sources')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TypeSource $typeSource = null;

    /**
     * @var Collection<int, PersonIdentityField>
     */
    #[ORM\OneToMany(mappedBy: 'source', targetEntity: PersonIdentityField::class)]
    private Collection $personIdentityFields;

    #[ORM\Column(length: 255)]
    private ?string $url = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $checkedAt = null;

    /**
     * @var Collection<int, SourceMedia>
     */
    #[ORM\OneToMany(mappedBy: 'source', targetEntity: SourceMedia::class)]
    private Collection $sourceMedia;

    public function __construct()
    {
        $this->personIdentityFields = new ArrayCollection();
        $this->sourceMedia = new ArrayCollection();
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

    public function isDigital(): ?bool
    {
        return $this->is_digital;
    }

    public function setDigital(bool $is_digital): static
    {
        $this->is_digital = $is_digital;

        return $this;
    }

    public function isVerified(): ?bool
    {
        return $this->is_verified;
    }

    public function setVerified(bool $is_verified): static
    {
        $this->is_verified = $is_verified;

        return $this;
    }

    public function getTypeSource(): ?TypeSource
    {
        return $this->typeSource;
    }

    public function setTypeSource(?TypeSource $typeSource): static
    {
        $this->typeSource = $typeSource;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getCheckedAt(): ?\DateTimeInterface
    {
        return $this->checkedAt;
    }

    public function setCheckedAt(\DateTimeInterface $checkedAt): static
    {
        $this->checkedAt = $checkedAt;

        return $this;
    }

    /**
     * @return Collection<int, SourceMedia>
     */
    public function getSourceMedia(): Collection
    {
        return $this->sourceMedia;
    }

    public function addSourceMedium(SourceMedia $sourceMedium): static
    {
        if (!$this->sourceMedia->contains($sourceMedium)) {
            $this->sourceMedia->add($sourceMedium);
            $sourceMedium->setSource($this);
        }

        return $this;
    }

    public function removeSourceMedium(SourceMedia $sourceMedium): static
    {
        if ($this->sourceMedia->removeElement($sourceMedium)) {
            // set the owning side to null (unless already changed)
            if ($sourceMedium->getSource() === $this) {
                $sourceMedium->setSource(null);
            }
        }

        return $this;
    }
}
