<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240906111201 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE media_object_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_picture_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE media_object (id INT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE person_picture (id INT NOT NULL, person_id INT NOT NULL, image_id INT DEFAULT NULL, source_id INT NOT NULL, title VARCHAR(255) NOT NULL, alt VARCHAR(255) NOT NULL, is_main BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3445FC00217BBB47 ON person_picture (person_id)');
        $this->addSql('CREATE INDEX IDX_3445FC003DA5256D ON person_picture (image_id)');
        $this->addSql('CREATE INDEX IDX_3445FC00953C1C61 ON person_picture (source_id)');
        $this->addSql('ALTER TABLE person_picture ADD CONSTRAINT FK_3445FC00217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_picture ADD CONSTRAINT FK_3445FC003DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_picture ADD CONSTRAINT FK_3445FC00953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE media_object_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_picture_id_seq CASCADE');
        $this->addSql('ALTER TABLE person_picture DROP CONSTRAINT FK_3445FC00217BBB47');
        $this->addSql('ALTER TABLE person_picture DROP CONSTRAINT FK_3445FC003DA5256D');
        $this->addSql('ALTER TABLE person_picture DROP CONSTRAINT FK_3445FC00953C1C61');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP TABLE person_picture');
    }
}
