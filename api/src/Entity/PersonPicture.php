<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\PersonPictureRepository;
use App\State\PersonPictureProcessor;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PersonPictureRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['picture:read']], 
    denormalizationContext: ['groups' => ['picture:write']],
    outputFormats: ['jsonld' => ['application/ld+json']],
    operations: [
        new GetCollection(),
        new Get(),
        new Post(
            inputFormats: ['multipart' => ['multipart/form-data']],
            denormalizationContext: ['groups' => ['picture:write']],            
        ),
        new Delete()
    ] 
)]
#[UniqueEntity(fields: ['person'], repositoryMethod: 'checkUniqueMain')]
class PersonPicture
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['picture:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['picture:write', 'picture:read'])]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Groups(['picture:write', 'picture:read'])]
    private ?string $alt = null;

    #[ORM\ManyToOne(inversedBy: 'personPictures')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['picture:write', 'picture:read'])]
    private ?Person $person = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['picture:write', 'picture:read'])]
    private ?Source $source = null;

    #[ORM\Column(name: "is_main", options: ['default' => false])]
    #[Assert\NotNull]
    #[Groups(['picture:write', 'picture:read'])]
    private ?bool $main = null;

    #[ORM\ManyToOne(targetEntity: MediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    public ?MediaObject $image = null;

    #[ApiProperty(types: ['https://schema.org/contentUrl'])]
    #[Groups(['picture:read'])]
    public ?string $contentUrl = null;

    /**
     * @Vich\UploadableField(mapping="image", fileNameProperty="filePath")
     */
    #[Groups(['picture:write'])]
    public ?File $file = null;

    #[ORM\Column(nullable: true)] 
    public ?string $filePath = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getAlt(): ?string
    {
        return $this->alt;
    }

    public function setAlt(string $alt): static
    {
        $this->alt = $alt;

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

    public function getSource(): ?Source
    {
        return $this->source;
    }

    public function setSource(?Source $source): static
    {
        $this->source = $source;

        return $this;
    }

    public function isMain(): ?bool
    {
        return $this->main;
    }

    public function setMain(bool $main): static
    {
        $this->main = $main;

        return $this;
    }
}
