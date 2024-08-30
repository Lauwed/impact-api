<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SourceMediaRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SourceMediaRepository::class)]
#[ApiResource]
class SourceMedia
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $content = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?TypeMedia $typeMedia = null;

    #[ORM\ManyToOne(inversedBy: 'sourceMedia')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Source $source = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getTypeMedia(): ?TypeMedia
    {
        return $this->typeMedia;
    }

    public function setTypeMedia(?TypeMedia $typeMedia): static
    {
        $this->typeMedia = $typeMedia;

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
