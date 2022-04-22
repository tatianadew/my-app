import React, { ChangeEventHandler, FormEventHandler } from "react";
import "./PlaylistForm.css";

type Props = {
  onCreate: FormEventHandler<HTMLFormElement>,
  handleChangeDesc: ChangeEventHandler<HTMLInputElement>,
  handleChangeTitle: ChangeEventHandler<HTMLInputElement>,
}

function PlaylistForm(props: Props) {
  return (
    <form className="form" onSubmit={props.onCreate}>
      <div className="form-text">
        <label htmlFor="title">
          Title
          <br></br>
        <input
          type="text"
          id="title"
          name="title"
          onChange={props.handleChangeTitle}
            minLength={10}
          required
        />
        </label>
        <br />
      </div>
      <div className="form-text">
        <label htmlFor="description">
          Description
          <br></br>
        <input
          type="text"
          id="description"
          name="description"
          onChange={props.handleChangeDesc}
          required
        />
        </label>
        <br />
      </div>
      <button type="submit" value="submit">
        Create playlist
      </button>
    </form>
  );
};

export default PlaylistForm;