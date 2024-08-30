<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240830133216 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_relative_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_school_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_social_status_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE school_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE type_relative_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE type_social_status_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE category (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE person_category (id INT NOT NULL, person_id INT NOT NULL, category_id INT NOT NULL, source_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_920ABCF6217BBB47 ON person_category (person_id)');
        $this->addSql('CREATE INDEX IDX_920ABCF612469DE2 ON person_category (category_id)');
        $this->addSql('CREATE INDEX IDX_920ABCF6953C1C61 ON person_category (source_id)');
        $this->addSql('CREATE TABLE person_relative (id INT NOT NULL, person_id INT NOT NULL, type_relative_id INT NOT NULL, source_id INT NOT NULL, name VARCHAR(255) NOT NULL, is_biological BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_FA1D92EE217BBB47 ON person_relative (person_id)');
        $this->addSql('CREATE INDEX IDX_FA1D92EEC3BE3438 ON person_relative (type_relative_id)');
        $this->addSql('CREATE INDEX IDX_FA1D92EE953C1C61 ON person_relative (source_id)');
        $this->addSql('CREATE TABLE person_school (id INT NOT NULL, person_id INT NOT NULL, school_id INT NOT NULL, source_id INT NOT NULL, degree VARCHAR(255) NOT NULL, start_date DATE DEFAULT NULL, end_date DATE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_653BEA0D217BBB47 ON person_school (person_id)');
        $this->addSql('CREATE INDEX IDX_653BEA0DC32A47EE ON person_school (school_id)');
        $this->addSql('CREATE INDEX IDX_653BEA0D953C1C61 ON person_school (source_id)');
        $this->addSql('CREATE TABLE person_social_status (id INT NOT NULL, person_id INT NOT NULL, type_social_status_id INT NOT NULL, source_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6DC5340D217BBB47 ON person_social_status (person_id)');
        $this->addSql('CREATE INDEX IDX_6DC5340DE3EDC7B ON person_social_status (type_social_status_id)');
        $this->addSql('CREATE INDEX IDX_6DC5340D953C1C61 ON person_social_status (source_id)');
        $this->addSql('CREATE TABLE school (id INT NOT NULL, name VARCHAR(255) NOT NULL, city VARCHAR(255) DEFAULT NULL, country VARCHAR(255) NOT NULL, postal_code VARCHAR(255) DEFAULT NULL, street VARCHAR(255) DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE type_relative (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE type_social_status (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE person_category ADD CONSTRAINT FK_920ABCF6217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_category ADD CONSTRAINT FK_920ABCF612469DE2 FOREIGN KEY (category_id) REFERENCES category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_category ADD CONSTRAINT FK_920ABCF6953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_relative ADD CONSTRAINT FK_FA1D92EE217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_relative ADD CONSTRAINT FK_FA1D92EEC3BE3438 FOREIGN KEY (type_relative_id) REFERENCES type_relative (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_relative ADD CONSTRAINT FK_FA1D92EE953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_school ADD CONSTRAINT FK_653BEA0D217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_school ADD CONSTRAINT FK_653BEA0DC32A47EE FOREIGN KEY (school_id) REFERENCES school (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_school ADD CONSTRAINT FK_653BEA0D953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_social_status ADD CONSTRAINT FK_6DC5340D217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_social_status ADD CONSTRAINT FK_6DC5340DE3EDC7B FOREIGN KEY (type_social_status_id) REFERENCES type_social_status (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_social_status ADD CONSTRAINT FK_6DC5340D953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_relative_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_school_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_social_status_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE school_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE type_relative_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE type_social_status_id_seq CASCADE');
        $this->addSql('ALTER TABLE person_category DROP CONSTRAINT FK_920ABCF6217BBB47');
        $this->addSql('ALTER TABLE person_category DROP CONSTRAINT FK_920ABCF612469DE2');
        $this->addSql('ALTER TABLE person_category DROP CONSTRAINT FK_920ABCF6953C1C61');
        $this->addSql('ALTER TABLE person_relative DROP CONSTRAINT FK_FA1D92EE217BBB47');
        $this->addSql('ALTER TABLE person_relative DROP CONSTRAINT FK_FA1D92EEC3BE3438');
        $this->addSql('ALTER TABLE person_relative DROP CONSTRAINT FK_FA1D92EE953C1C61');
        $this->addSql('ALTER TABLE person_school DROP CONSTRAINT FK_653BEA0D217BBB47');
        $this->addSql('ALTER TABLE person_school DROP CONSTRAINT FK_653BEA0DC32A47EE');
        $this->addSql('ALTER TABLE person_school DROP CONSTRAINT FK_653BEA0D953C1C61');
        $this->addSql('ALTER TABLE person_social_status DROP CONSTRAINT FK_6DC5340D217BBB47');
        $this->addSql('ALTER TABLE person_social_status DROP CONSTRAINT FK_6DC5340DE3EDC7B');
        $this->addSql('ALTER TABLE person_social_status DROP CONSTRAINT FK_6DC5340D953C1C61');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE person_category');
        $this->addSql('DROP TABLE person_relative');
        $this->addSql('DROP TABLE person_school');
        $this->addSql('DROP TABLE person_social_status');
        $this->addSql('DROP TABLE school');
        $this->addSql('DROP TABLE type_relative');
        $this->addSql('DROP TABLE type_social_status');
    }
}
