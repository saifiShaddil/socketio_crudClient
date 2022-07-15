import React, { useState } from "react"
import { Button, Form, Message, Select } from "semantic-ui-react"

const AddForm = (props) => {
  const genderOptions = [
    { key: "m", text: "Male", value: "m" },
    { key: "f", text: "Female", value: "f" },
    { key: "o", text: "Do Not Disclose", value: "o" },
  ]

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    age: "",
    gender: "",
  })
  const { fullname, email, age, gender } = formData
  const hanleSubmit = (e) => {
    e.preventDefault()
  }
  const method = props.userID ? "put" : "post"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSelectChange = (e, data) => {
    setFormData({ ...formData, gender: data.value })
  }
  return (
    <Form success onSubmit={(e) => hanleSubmit(e)}>
      <Form.Field>
        <label>Full Name</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="fullname"
          value={fullname}
          placeholder="Full Name"
          error
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          onChange={(e) => handleChange(e)}
          name="email"
          value={email}
          placeholder="joe@schmoe.com"
          error
        />
      </Form.Field>
      <Form.Field>
        <label>Age</label>
        <input
          type="number"
          min="5"
          max="120"
          onChange={(e) => handleChange(e)}
          name="age"
          value={age}
          placeholder="18"
          error
        />
      </Form.Field>
      <Select
        label="Gender"
        options={genderOptions}
        placeholder="Gender"
        value={gender}
        onChange={handleSelectChange}
      ></Select>
      <Message
        success
        header="Updated Successfully"
        content="You're all signed up for the newsletter"
      />
      <Button color={props.buttonColor}>{props.buttonSubmitTitle}</Button>
    </Form>
  )
}

export default AddForm
