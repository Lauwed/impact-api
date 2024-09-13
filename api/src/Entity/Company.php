<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CompanyRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ApiResource(
    outputFormats: ['jsonld' => ['application/ld+json']],
    normalizationContext: ['groups' => ['personJob:read']]
)]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['personJob:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['personJob:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['personJob:read'])]
    private ?string $country = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['personJob:read'])]
    private ?string $city = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['personJob:read'])]
    private ?string $postalCode = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['personJob:read'])]
    private ?string $street = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['personJob:read'])]
    private ?string $url = null;

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

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(?string $postalCode): static
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(?string $street): static
    {
        $this->street = $street;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): static
    {
        $this->url = $url;

        return $this;
    }
}
