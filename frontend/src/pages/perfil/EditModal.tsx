import React, { useRef, useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useApi } from "../../hooks/useApi";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../store/store";
import { userUpdate } from "../../slices/userSlices";
import { EditContainer } from "./styles";

const loginForm = yup.object().shape({
  name: yup.string().min(5).max(15).required(),
  email: yup.string().required("Email is required!").email(),
});

const EditModal = ({
  handleEdit,
  id,
}: {
  handleEdit: () => void;
  id: string;
}) => {
  const { data } = useApi(`/users/perfil/${id}`);
  const bio = useRef<HTMLTextAreaElement | null>(null);
  const [image, setImage] = useState<File | string>("");
  const dispatch = useAppDispatch();

  const handleImage = (e: React.FormEvent<HTMLInputElement>) => {
    const img = (e.target as HTMLInputElement).files;
    console.log(img);
    if (img) setImage(img[0]);
  };

  async function handleUpdate(data: FieldValues) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("image", image);
    if (bio.current) formData.append("bio", bio.current.value);

    await dispatch(userUpdate(formData))
    handleEdit()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginForm) });

  return (
    <EditContainer>
      <div className="close" onClick={handleEdit}></div>
      <div className="content">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="picture">
            <img
              src={`http://localhost:5001/users/${data.perfilPhoto}`}
              alt="user photos"
            />
            <div>
              <label htmlFor="image">Change photo</label>
              <input type="file" id="image" onChange={(e) => handleImage(e)} />
            </div>
          </div>
          <div className="input">
            <label htmlFor="name">Name</label>
            <input
              className={errors.name ? "error_input" : ""}
              type="text"
              {...register("name")}
              placeholder="edusantanaw"
              value={data.name}
            />
            <p className="error">
              {errors?.name && <>{errors.name.message} </>}
            </p>
          </div>
          <div className="input">
            <label htmlFor="email">E-mail</label>
            <input
              className={errors.email ? "error_input" : ""}
              type="text"
              {...register("email")}
              placeholder="edusantanaw"
              value={data.email}
            />
            <p className="error">
              {errors?.email && <>{errors.email.message} </>}
            </p>
          </div>
          <div className="input">
            <label htmlFor="bio">Bio</label>
            <textarea name="bio" value={data.bio} ref={bio} maxLength={255}></textarea>
          </div>
          <input type="submit" />
        </form>
      </div>
    </EditContainer>
  );
};

export default EditModal;

