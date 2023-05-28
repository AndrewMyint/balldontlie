import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import TeamList from "./TeamList";

const TeamForm: React.FC = () => {
  const { user, addTeam, teams } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    name: "",
    playerCount: "",
    region: "",
    country: "",
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (teams.some((team) => team.name === values.name)) {
      errors.name = "Team name must be unique";
    }

    if (!values.playerCount) {
      errors.playerCount = "Required";
    } else if (isNaN(Number(values.playerCount))) {
      errors.playerCount = "Player count must be a number";
    }

    if (!values.region) {
      errors.region = "Required";
    } else if (!isNaN(Number(values.region))) {
      errors.region = "Region must be a string";
    }

    if (!values.country) {
      errors.country = "Required";
    } else if (!isNaN(Number(values.country))) {
      errors.country = "Country must be a string";
    }

    return errors;
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    const newTeam = {
      name: values.name,
      playerCount: Number(values.playerCount),
      region: values.region,
      country: values.country,
    };

    addTeam(newTeam);
    resetForm();
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    user && (
      <div>
        <h2>Create Team</h2>
        <button onClick={openModal}>Create Team</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            <Form style={{ padding: "20px", margin: "20px" }}>
              <div style={{ margin: "10px 0" }}>
                <label htmlFor="name">Team Name</label>
                <Field type="text" id="name" name="name" />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="name" component="div" />
                </div>
              </div>
              <div style={{ margin: "10px 0" }}>
                <label htmlFor="playerCount">Player Count</label>
                <Field type="text" id="playerCount" name="playerCount" />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="playerCount" component="div" />
                </div>
              </div>
              <div style={{ margin: "10px 0" }}>
                <label htmlFor="region">Region</label>
                <Field type="text" id="region" name="region" />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="region" component="div" />
                </div>
              </div>
              <div style={{ margin: "10px 0" }}>
                <label htmlFor="country">Country</label>
                <Field type="text" id="country" name="country" />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="country" component="div" />
                </div>
              </div>
              <button type="submit">Create</button>
            </Form>
          </Formik>
        </Modal>
        <TeamList />
      </div>
    )
  );
};

export default TeamForm;
