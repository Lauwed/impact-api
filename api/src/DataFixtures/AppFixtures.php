<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager)
    {
        $user = $manager->getRepository(User::class)->findOneBy(['username' => 'admin']);
        if ($user) {
            return;
        }

        $newUser = new User();
        $newUser->setUsername('admin');
        $newUser->setEmail('admin@localhost');
        $newUser->setRoles(['ROLE_ADMIN']);

        $password = $this->hasher->hashPassword($newUser, 'admin');
        $newUser->setPassword($password);

        $manager->persist($newUser);
        $manager->flush();
    }
}
