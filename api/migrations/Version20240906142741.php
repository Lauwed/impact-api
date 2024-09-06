<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240906142741 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE company_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE job_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE media_object_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_identity_field_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_job_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_picture_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_relative_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_school_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE person_social_status_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE school_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE source_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE source_media_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE type_identity_field_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE type_media_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE type_relative_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE type_social_status_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE type_source_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE category (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE company (id INT NOT NULL, name VARCHAR(255) NOT NULL, country VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(255) DEFAULT NULL, street VARCHAR(255) DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE job (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE media_object (id INT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE person (id INT NOT NULL, name VARCHAR(255) NOT NULL, romanized_name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE person_category (id INT NOT NULL, person_id INT NOT NULL, category_id INT NOT NULL, source_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_920ABCF6217BBB47 ON person_category (person_id)');
        $this->addSql('CREATE INDEX IDX_920ABCF612469DE2 ON person_category (category_id)');
        $this->addSql('CREATE INDEX IDX_920ABCF6953C1C61 ON person_category (source_id)');
        $this->addSql('CREATE TABLE person_identity_field (id INT NOT NULL, type_identity_field_id INT NOT NULL, source_id INT NOT NULL, person_id INT NOT NULL, value VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_54733F96BBED47E2 ON person_identity_field (type_identity_field_id)');
        $this->addSql('CREATE INDEX IDX_54733F96953C1C61 ON person_identity_field (source_id)');
        $this->addSql('CREATE INDEX IDX_54733F96217BBB47 ON person_identity_field (person_id)');
        $this->addSql('CREATE TABLE person_job (id INT NOT NULL, job_id INT NOT NULL, company_id INT DEFAULT NULL, person_id INT NOT NULL, source_id INT NOT NULL, start_date DATE DEFAULT NULL, end_date DATE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_789527E3BE04EA9 ON person_job (job_id)');
        $this->addSql('CREATE INDEX IDX_789527E3979B1AD6 ON person_job (company_id)');
        $this->addSql('CREATE INDEX IDX_789527E3217BBB47 ON person_job (person_id)');
        $this->addSql('CREATE INDEX IDX_789527E3953C1C61 ON person_job (source_id)');
        $this->addSql('CREATE TABLE person_picture (id INT NOT NULL, person_id INT NOT NULL, image_id INT DEFAULT NULL, source_id INT NOT NULL, title VARCHAR(255) NOT NULL, alt VARCHAR(255) NOT NULL, is_main BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3445FC00217BBB47 ON person_picture (person_id)');
        $this->addSql('CREATE INDEX IDX_3445FC003DA5256D ON person_picture (image_id)');
        $this->addSql('CREATE INDEX IDX_3445FC00953C1C61 ON person_picture (source_id)');
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
        $this->addSql('CREATE TABLE source (id INT NOT NULL, type_source_id INT NOT NULL, name VARCHAR(255) NOT NULL, is_digital BOOLEAN NOT NULL, is_verified BOOLEAN NOT NULL, url VARCHAR(255) NOT NULL, checked_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5F8A7F7321FA5D71 ON source (type_source_id)');
        $this->addSql('CREATE TABLE source_media (id INT NOT NULL, image_id INT DEFAULT NULL, type_media_id INT NOT NULL, source_id INT NOT NULL, content VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F3247A333DA5256D ON source_media (image_id)');
        $this->addSql('CREATE INDEX IDX_F3247A332760FA89 ON source_media (type_media_id)');
        $this->addSql('CREATE INDEX IDX_F3247A33953C1C61 ON source_media (source_id)');
        $this->addSql('CREATE TABLE type_identity_field (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE type_media (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE type_relative (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE type_social_status (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE type_source (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE person_category ADD CONSTRAINT FK_920ABCF6217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_category ADD CONSTRAINT FK_920ABCF612469DE2 FOREIGN KEY (category_id) REFERENCES category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_category ADD CONSTRAINT FK_920ABCF6953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_identity_field ADD CONSTRAINT FK_54733F96BBED47E2 FOREIGN KEY (type_identity_field_id) REFERENCES type_identity_field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_identity_field ADD CONSTRAINT FK_54733F96953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_identity_field ADD CONSTRAINT FK_54733F96217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_job ADD CONSTRAINT FK_789527E3BE04EA9 FOREIGN KEY (job_id) REFERENCES job (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_job ADD CONSTRAINT FK_789527E3979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_job ADD CONSTRAINT FK_789527E3217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_job ADD CONSTRAINT FK_789527E3953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_picture ADD CONSTRAINT FK_3445FC00217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_picture ADD CONSTRAINT FK_3445FC003DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_picture ADD CONSTRAINT FK_3445FC00953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_relative ADD CONSTRAINT FK_FA1D92EE217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_relative ADD CONSTRAINT FK_FA1D92EEC3BE3438 FOREIGN KEY (type_relative_id) REFERENCES type_relative (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_relative ADD CONSTRAINT FK_FA1D92EE953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_school ADD CONSTRAINT FK_653BEA0D217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_school ADD CONSTRAINT FK_653BEA0DC32A47EE FOREIGN KEY (school_id) REFERENCES school (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_school ADD CONSTRAINT FK_653BEA0D953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_social_status ADD CONSTRAINT FK_6DC5340D217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_social_status ADD CONSTRAINT FK_6DC5340DE3EDC7B FOREIGN KEY (type_social_status_id) REFERENCES type_social_status (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE person_social_status ADD CONSTRAINT FK_6DC5340D953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE source ADD CONSTRAINT FK_5F8A7F7321FA5D71 FOREIGN KEY (type_source_id) REFERENCES type_source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE source_media ADD CONSTRAINT FK_F3247A333DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE source_media ADD CONSTRAINT FK_F3247A332760FA89 FOREIGN KEY (type_media_id) REFERENCES type_media (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE source_media ADD CONSTRAINT FK_F3247A33953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE company_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE job_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE media_object_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_identity_field_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_job_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_picture_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_relative_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_school_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE person_social_status_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE school_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE source_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE source_media_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE type_identity_field_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE type_media_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE type_relative_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE type_social_status_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE type_source_id_seq CASCADE');
        $this->addSql('ALTER TABLE person_category DROP CONSTRAINT FK_920ABCF6217BBB47');
        $this->addSql('ALTER TABLE person_category DROP CONSTRAINT FK_920ABCF612469DE2');
        $this->addSql('ALTER TABLE person_category DROP CONSTRAINT FK_920ABCF6953C1C61');
        $this->addSql('ALTER TABLE person_identity_field DROP CONSTRAINT FK_54733F96BBED47E2');
        $this->addSql('ALTER TABLE person_identity_field DROP CONSTRAINT FK_54733F96953C1C61');
        $this->addSql('ALTER TABLE person_identity_field DROP CONSTRAINT FK_54733F96217BBB47');
        $this->addSql('ALTER TABLE person_job DROP CONSTRAINT FK_789527E3BE04EA9');
        $this->addSql('ALTER TABLE person_job DROP CONSTRAINT FK_789527E3979B1AD6');
        $this->addSql('ALTER TABLE person_job DROP CONSTRAINT FK_789527E3217BBB47');
        $this->addSql('ALTER TABLE person_job DROP CONSTRAINT FK_789527E3953C1C61');
        $this->addSql('ALTER TABLE person_picture DROP CONSTRAINT FK_3445FC00217BBB47');
        $this->addSql('ALTER TABLE person_picture DROP CONSTRAINT FK_3445FC003DA5256D');
        $this->addSql('ALTER TABLE person_picture DROP CONSTRAINT FK_3445FC00953C1C61');
        $this->addSql('ALTER TABLE person_relative DROP CONSTRAINT FK_FA1D92EE217BBB47');
        $this->addSql('ALTER TABLE person_relative DROP CONSTRAINT FK_FA1D92EEC3BE3438');
        $this->addSql('ALTER TABLE person_relative DROP CONSTRAINT FK_FA1D92EE953C1C61');
        $this->addSql('ALTER TABLE person_school DROP CONSTRAINT FK_653BEA0D217BBB47');
        $this->addSql('ALTER TABLE person_school DROP CONSTRAINT FK_653BEA0DC32A47EE');
        $this->addSql('ALTER TABLE person_school DROP CONSTRAINT FK_653BEA0D953C1C61');
        $this->addSql('ALTER TABLE person_social_status DROP CONSTRAINT FK_6DC5340D217BBB47');
        $this->addSql('ALTER TABLE person_social_status DROP CONSTRAINT FK_6DC5340DE3EDC7B');
        $this->addSql('ALTER TABLE person_social_status DROP CONSTRAINT FK_6DC5340D953C1C61');
        $this->addSql('ALTER TABLE source DROP CONSTRAINT FK_5F8A7F7321FA5D71');
        $this->addSql('ALTER TABLE source_media DROP CONSTRAINT FK_F3247A333DA5256D');
        $this->addSql('ALTER TABLE source_media DROP CONSTRAINT FK_F3247A332760FA89');
        $this->addSql('ALTER TABLE source_media DROP CONSTRAINT FK_F3247A33953C1C61');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE job');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP TABLE person');
        $this->addSql('DROP TABLE person_category');
        $this->addSql('DROP TABLE person_identity_field');
        $this->addSql('DROP TABLE person_job');
        $this->addSql('DROP TABLE person_picture');
        $this->addSql('DROP TABLE person_relative');
        $this->addSql('DROP TABLE person_school');
        $this->addSql('DROP TABLE person_social_status');
        $this->addSql('DROP TABLE school');
        $this->addSql('DROP TABLE source');
        $this->addSql('DROP TABLE source_media');
        $this->addSql('DROP TABLE type_identity_field');
        $this->addSql('DROP TABLE type_media');
        $this->addSql('DROP TABLE type_relative');
        $this->addSql('DROP TABLE type_social_status');
        $this->addSql('DROP TABLE type_source');
    }
}
