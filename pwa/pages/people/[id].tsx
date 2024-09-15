import AchievementField from "@/components/AchievementField";
import CategoryField from "@/components/CategoryField";
import AddAchievementForm from "@/components/form/AddAchievementForm";
import FormControl from "@/components/form/FormControl";
import JobField from "@/components/JobField";
import Modal from "@/components/Modal";
import AddPersonCategoryModal from "@/components/modals/AddPersonCategoryModal";
import AddPersonJobModal from "@/components/modals/AddPersonJobModal";
import AddPersonRelativeModal from "@/components/modals/AddPersonRelativeModal";
import AddPersonSchoolModal from "@/components/modals/AddPersonSchoolModal";
import AddPersonSocialStatusModal from "@/components/modals/AddPersonSocialStatusModal";
import RelativeField from "@/components/RelativeField";
import SchoolField from "@/components/SchoolField";
import SocialStatusField from "@/components/SocialStatusField";
import { format } from "date-fns";
import { Edit3, Trash } from "lucide-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../../components/Button";
import Heading from "../../components/common/Heading";
import Main from "../../components/common/Main";
import Section from "../../components/common/Section";
import { useAuth } from "../../components/context/auth";
import IdentityField from "../../components/IdentityField";
import AddPersonIdentityFieldModal from "../../components/modals/AddPersonIdentityFieldModal";
import { fetcher } from "../../components/utils/fetcher";
import { Person, ResponseSingle } from "../../types";

const PeopleDetail = ({ woman }: { woman: ResponseSingle<Person> }) => {
  const router = useRouter();
  const [socialStatusModalOpen, setSocialStatusModalOpen] = useState(false);
  const [identityFieldModalOpen, setIdentityFieldModalOpen] = useState(false);
  const [relativeModalOpen, setRelativeModalOpen] = useState(false);
  const [schoolModalOpen, setSchoolModalOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [mainPictureModalOpen, setMainPictureModalOpen] = useState(false);
  const [identityFields, setIdentityFields] = useState<string[]>(
    woman.personIdentityFields
  );
  const [relatives, setRelatives] = useState<string[]>(woman.personRelatives);
  const [schools, setSchools] = useState<string[]>(woman.personSchools);
  const [jobs, setJobs] = useState<string[]>(woman.personJobs);
  const [socialStatuses, setSocialStatuses] = useState<string[]>(
    woman.personSocialStatuses
  );
  const [achievements, setAchievements] = useState<string[]>(
    woman.achievements
  );

  const [categories, setCategories] = useState<string[]>(
    woman.personCategories
  );
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState<string>(woman.name);
  const [editedRomanizedName, setEditedRomanizedName] = useState<string>(
    woman.romanizedName || ""
  );

  const [womanData, setWomanData] = useState<Person>(woman);

  const { data, isLoading, mutate } = useSWR(`/people/${woman.id}`, fetcher);
  const { user } = useAuth();

  useEffect(() => {
    if (data) {
      setIdentityFields(data.personIdentityFields);
      setSchools(data.personSchools);
      setJobs(data.personJobs);
      setCategories(data.personCategories);
      setSocialStatuses(data.personSocialStatuses);
      setRelatives(data.personRelatives);
      setAchievements(data.achievements);

      setWomanData(data);
    }
  }, [data]);

  // Function to handle deletion of the person
  const handleDelete = async () => {
    try {
      await fetch(`/people/${womanData.id}`, {
        method: "DELETE",
      });
      setIsDeleteModalOpen(false);
      // You might want to redirect or refetch the data
      router.push("/people"); // Redirect to the list after deletion
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  const handleEditName = async () => {
    try {
      await fetch(`/people/${womanData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({
          name: editedName,
          romanizedName: editedRomanizedName,
        }),
      });
      setIsEditModalOpen(false);
      mutate(); // Refetch data after update
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  return (
    <Main>
      <div className="flex flex-col md:flex-row-reverse gap-10 mb-10">
        <Section customClass="flex-1">
          <div className="flex items-start gap-8">
            <div>
              <Heading customStyle="!mb-2">{womanData.name}</Heading>
              <div className="md:flex gap-4 text-sm text-slate-700">
                <p>Created at : {format(womanData.created_at, "yyyy-mm-dd")}</p>
                <p>Updated at : {format(womanData.updated_at, "yyyy-mm-dd")}</p>
              </div>
              {womanData.romanizedName ? (
                <p>{womanData.romanizedName}</p>
              ) : (
                <></>
              )}
            </div>

            {/* Delete Button */}
            {user && user.roles.includes("ROLE_ADMIN") && (
              <>
                <Button
                  customStyle="bg-blue-500 text-white flex gap-2 items-center"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Edit3 size={16} color="#fff" /> Edit Name
                </Button>
                <Button
                  customStyle="bg-red-500 text-white flex gap-2 items-center"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <Trash size={16} color="#fff" /> Delete
                </Button>

                {/* Edit Name Modal */}
                <Modal
                  isOpen={isEditModalOpen}
                  setIsOpen={() => setIsEditModalOpen(false)}
                >
                  <Heading level="h2">Edit {womanData.name}'s Name</Heading>
                  <FormControl
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    label="Edit name"
                    id="name"
                    name="name"
                    required
                  />
                  <FormControl
                    type="text"
                    value={editedRomanizedName}
                    onChange={(e) => setEditedRomanizedName(e.target.value)}
                    label="Edit romanized name"
                    id="romanizedName"
                    name="romanizedName"
                  />
                  <div className="flex justify-end gap-4 mt-4">
                    <Button
                      customStyle="bg-gray-300"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      customStyle="bg-blue-500 text-white"
                      onClick={handleEditName}
                    >
                      Save
                    </Button>
                  </div>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                  isOpen={isDeleteModalOpen}
                  setIsOpen={() => setIsDeleteModalOpen(false)}
                >
                  <p>Are you sure you want to delete {womanData.name}?</p>
                  <div className="flex justify-end gap-4 mt-4">
                    <Button
                      customStyle="bg-gray-300"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      customStyle="bg-red-500 text-white"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </Modal>
              </>
            )}
          </div>

          {/* Categories Section */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <CategoryField key={index} uri={category} actions />
              ))
            ) : (
              <p className="text-slate-700 text-sm">
                No categories assigned yet.
              </p>
            )}

            {/* Add Category Button */}
            {user && (
              <Button onClick={() => setIsAddCategoryModalOpen(true)}>+</Button>
            )}
          </div>

          <AddPersonCategoryModal
            personId={womanData.id}
            modalOpen={isAddCategoryModalOpen}
            setModalOpen={setIsAddCategoryModalOpen as () => void}
            onClose={() => {
              mutate();
            }}
          />
        </Section>

        <section className="md:w-1/3 border border-black p-4 rounded md:w-1/2">
          <Heading level="h2">Main Picture</Heading>

          {user ? (
            <>
              {/* <Button onClick={() => setMainPictureModalOpen(true)}>
                Edit main picture
              </Button>
              <EditMainPersonPicture
                personId={womanData.id}
                modalOpen={mainPictureModalOpen}
                setModalOpen={setMainPictureModalOpen as () => void}
                onClose={() => {
                  mutate();
                }}
              /> */}
            </>
          ) : (
            <></>
          )}
        </section>
      </div>

      <div className="flex flex-col md:flex-row gap-10 mb-10">
        {/* IDENTITY FIELDS */}
        <Section customClass="border border-black p-4 rounded md:w-1/2">
          <Heading level="h2">Identity</Heading>

          {identityFields.length > 0 ? (
            <ul className="mb-4">
              {identityFields.map((identityField, index) => (
                <li key={index}>
                  <IdentityField actions uri={identityField} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4 text-slate-700">No identity information yet.</p>
          )}

          {user ? (
            <>
              <Button onClick={() => setIdentityFieldModalOpen(true)}>
                Add an identity information
              </Button>
              <AddPersonIdentityFieldModal
                personId={womanData.id}
                modalOpen={identityFieldModalOpen}
                setModalOpen={setIdentityFieldModalOpen as () => void}
                onClose={() => {
                  mutate();
                }}
              />
            </>
          ) : (
            <></>
          )}
        </Section>

        <div className="md:w-1/2">
          {/* SOCIAL STATUS */}
          <Section>
            <Heading level="h2">Social status</Heading>

            {socialStatuses.length > 0 ? (
              <ul className="mb-4">
                {socialStatuses.map((socialStatus, index) => (
                  <li key={index}>
                    <SocialStatusField actions uri={socialStatus} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 text-slate-700">No social status yet.</p>
            )}

            {user ? (
              <>
                <Button onClick={() => setSocialStatusModalOpen(true)}>
                  Add a social status information
                </Button>
                <AddPersonSocialStatusModal
                  personId={womanData.id}
                  modalOpen={socialStatusModalOpen}
                  setModalOpen={setSocialStatusModalOpen as () => void}
                  onClose={() => {
                    mutate();
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </Section>
          {/* RELATIVES */}
          <Section customClass="border border-black p-4 rounded">
            <Heading level="h2">Relative</Heading>

            {relatives.length > 0 ? (
              <ul className="mb-4">
                {relatives.map((relative, index) => (
                  <li key={index}>
                    <RelativeField actions uri={relative} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 text-slate-700">
                No relative information yet.
              </p>
            )}

            {user ? (
              <>
                <Button onClick={() => setRelativeModalOpen(true)}>
                  Add a relative information
                </Button>
                <AddPersonRelativeModal
                  personId={womanData.id}
                  modalOpen={relativeModalOpen}
                  setModalOpen={setRelativeModalOpen as () => void}
                  onClose={() => {
                    mutate();
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </Section>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* SCHOOLS */}
        <Section customClass="border border-black p-4 rounded md:w-1/2">
          <Heading level="h2">Schools</Heading>

          {schools.length > 0 ? (
            <ul className="mb-4">
              {schools.map((school, index) => (
                <li key={index}>
                  <SchoolField actions uri={school} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4 text-slate-700">No school information yet.</p>
          )}

          {user ? (
            <>
              <Button onClick={() => setSchoolModalOpen(true)}>
                Add a school information
              </Button>
              <AddPersonSchoolModal
                personId={womanData.id}
                modalOpen={schoolModalOpen}
                setModalOpen={setSchoolModalOpen as () => void}
                onClose={() => {
                  mutate();
                }}
              />
            </>
          ) : (
            <></>
          )}
        </Section>

        {/* JOBS */}
        <Section customClass="border border-black p-4 rounded md:w-1/2">
          <Heading level="h2">Jobs</Heading>

          {jobs.length > 0 ? (
            <ul className="mb-4">
              {jobs.map((job, index) => (
                <li key={index}>
                  <JobField actions uri={job} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4 text-slate-700">No job information yet.</p>
          )}

          {user ? (
            <>
              <Button onClick={() => setJobModalOpen(true)}>
                Add a job information
              </Button>
              <AddPersonJobModal
                personId={womanData.id}
                modalOpen={jobModalOpen}
                setModalOpen={setJobModalOpen as () => void}
                onClose={() => {
                  mutate();
                }}
              />
            </>
          ) : (
            <></>
          )}
        </Section>
      </div>

      {/* ACHIEVEMENTS */}
      <Section customClass="mt-8">
        <Heading level="h2">Achievements</Heading>

        <AddAchievementForm
          personId={womanData.id}
          onSubmit={() => {
            mutate();
          }}
        />

        {achievements.length > 0 ? (
          <ul className="mb-4 list-disc pl-6">
            {achievements.map((achievement, index) => (
              <li key={index} className="py-4 border-b">
                <AchievementField actions uri={achievement} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4 text-slate-700">No achievement yet.</p>
        )}
      </Section>
    </Main>
  );
};

export default PeopleDetail;

export const getServerSideProps = (async (req) => {
  // Fetch data from external API
  const res = await fetch(`http://php/people/${req.query.id}`, {
    headers: {
      accept: "application/ld+json",
    },
  });
  const repo: ResponseSingle<Person> = await res.json();

  // Pass data to the page via props
  return { props: { woman: repo } };
}) satisfies GetServerSideProps<{ woman: ResponseSingle<Person> }>;
