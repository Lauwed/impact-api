<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240913133226 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE person_job DROP CONSTRAINT fk_789527e3be04ea9');
        $this->addSql('DROP SEQUENCE job_id_seq CASCADE');
        $this->addSql('DROP TABLE job');
        $this->addSql('DROP INDEX idx_789527e3be04ea9');
        $this->addSql('ALTER TABLE person_job ADD job VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE person_job DROP job_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE job_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE job (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE person_job ADD job_id INT NOT NULL');
        $this->addSql('ALTER TABLE person_job DROP job');
        $this->addSql('ALTER TABLE person_job ADD CONSTRAINT fk_789527e3be04ea9 FOREIGN KEY (job_id) REFERENCES job (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_789527e3be04ea9 ON person_job (job_id)');
    }
}
