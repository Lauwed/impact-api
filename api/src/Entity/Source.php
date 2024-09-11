<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\SourceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SourceRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['source:read']], 
    outputFormats: ['jsonld' => ['application/ld+json']],
    operations: [
        new Get(security: "is_granted('PUBLIC_ACCESS')"),
        new GetCollection(security: "is_granted('PUBLIC_ACCESS')")
    ]
)]
class Source
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['source:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['source:read'])]
    private ?string $name = null;

    #[ORM\Column(name: 'is_digital')]
    #[Groups(['source:read'])]
    private ?bool $digital = null;

    #[ORM\Column(name: 'is_verified')]
    #[Groups(['source:read'])]
    private ?bool $verified = null;

    #[ORM\ManyToOne(inversedBy: 'sources')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['source:read'])]
    private ?TypeSource $typeSource = null;

    #[ORM\Column(length: 255)]
    #[Groups(['source:read'])]
    private ?string $url = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['source:read'])]
    private ?\DateTimeInterface $checkedAt = null;

    /**
     * @var Collection<int, SourceMedia>
     */
    #[ORM\OneToMany(mappedBy: 'source', targetEntity: SourceMedia::class)]
    private Collection $sourceMedia;

    public function __construct()
    {
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
        return $this->digital;
    }

    public function setDigital(bool $digital): static
    {
        $this->digital = $digital;

        return $this;
    }

    public function isVerified(): ?bool
    {
        return $this->verified;
    }

    public function setVerified(bool $verified): static
    {
        $this->verified = $verified;

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
