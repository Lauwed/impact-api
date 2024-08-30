<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240820183554 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE person_identity_field ADD person_id INT NOT NULL');
        $this->addSql('ALTER TABLE person_identity_field ADD CONSTRAINT FK_54733F96217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_54733F96217BBB47 ON person_identity_field (person_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE person_identity_field DROP CONSTRAINT FK_54733F96217BBB47');
        $this->addSql('DROP INDEX IDX_54733F96217BBB47');
        $this->addSql('ALTER TABLE person_identity_field DROP person_id');
    }
}
