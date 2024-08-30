<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240820185904 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE company_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE job_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_job_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE source_media_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE type_media_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE company (id INT NOT NULL, name VARCHAR(255) NOT NULL, country VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(255) DEFAULT NULL, street VARCHAR(255) DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE job (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE person_job (id INT NOT NULL, job_id INT NOT NULL, company_id INT DEFAULT NULL, person_id INT NOT NULL, source_id INT NOT NULL, start_date DATE DEFAULT NULL, end_date DATE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_789527E3BE04EA9 ON person_job (job_id)');
        $this->addSql('CREATE INDEX IDX_789527E3979B1AD6 ON person_job (company_id)');
        $this->addSql('CREATE INDEX IDX_789527E3217BBB47 ON person_job (person_id)');
        $this->addSql('CREATE INDEX IDX_789527E3953C1C61 ON person_job (source_id)');
        $this->addSql('CREATE TABLE source_media (id INT NOT NULL, type_media_id INT NOT NULL, source_id INT NOT NULL, content VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F3247A332760FA89 ON source_media (type_media_id)');
        $this->addSql('CREATE INDEX IDX_F3247A33953C1C61 ON source_media (source_id)');
        $this->addSql('CREATE TABLE type_media (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE person_job ADD CONSTRAINT FK_789527E3BE04EA9 FOREIGN KEY (job_id) REFERENCES job (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_job ADD CONSTRAINT FK_789527E3979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_job ADD CONSTRAINT FK_789527E3217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_job ADD CONSTRAINT FK_789527E3953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE source_media ADD CONSTRAINT FK_F3247A332760FA89 FOREIGN KEY (type_media_id) REFERENCES type_media (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE source_media ADD CONSTRAINT FK_F3247A33953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE company_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE job_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_job_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE source_media_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE type_media_id_seq CASCADE');
        $this->addSql('ALTER TABLE person_job DROP CONSTRAINT FK_789527E3BE04EA9');
        $this->addSql('ALTER TABLE person_job DROP CONSTRAINT FK_789527E3979B1AD6');
        $this->addSql('ALTER TABLE person_job DROP CONSTRAINT FK_789527E3217BBB47');
        $this->addSql('ALTER TABLE person_job DROP CONSTRAINT FK_789527E3953C1C61');
        $this->addSql('ALTER TABLE source_media DROP CONSTRAINT FK_F3247A332760FA89');
        $this->addSql('ALTER TABLE source_media DROP CONSTRAINT FK_F3247A33953C1C61');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE job');
        $this->addSql('DROP TABLE person_job');
        $this->addSql('DROP TABLE source_media');
        $this->addSql('DROP TABLE type_media');
    }
}
