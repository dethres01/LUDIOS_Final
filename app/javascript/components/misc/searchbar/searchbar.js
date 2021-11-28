import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";


const SearchBar = (props) => {
  return (
    <Form className="d-flex mb-3">
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        onChange={props.handleChange}
      />
    </Form>
  )
}

export default SearchBar;