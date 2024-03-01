import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function App() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(0);
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState(0);
  const [image, setImage] = useState(0);
  const [url, setUrl] = useState(0);
  const [created, setCreated] = useState(0);
  const [id, setId] = useState(0);
  const [isShowingFavorites, setIsShowingFavorites] = useState(false);

  const [editar, setEditar] = useState(false);

  const [charactersList, setCharacters] = useState([]);

  const addFavorite = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      status: status,
      species: species,
      type: type,
      gender: gender,
      image: image,
      url: url,
      created: created,
    }).then(() => {
      getFavorites();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: "<i>El personaje  " + name + " fue registrado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const updateFavorite = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      name: name,
      status: status,
      species: species,
      type: type,
      gender: gender,
      image: image,
      url: url,
    }).then(() => {
      getFavorites();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizacion exitosa</strong>",
        html: "<i>El empleado  " + name + " fue actualizado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const deleteFavorite = (val) => {
    Swal.fire({
      title: "Confirmar eliminacion",
      html: "<i>Realmente desea eliminar a  " + val.name + " ??</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getFavorites();
          limpiarCampos();
          Swal.fire({
            title: "Eliminado!",
            text: val.name + " ha sido eliminado.",
            icon: "success",
            timer: 3000,
          });
        });
      }
    });
  };

  const addToFavorites = (val) => {
    Axios.post("http://localhost:3001/create", {
      name: val.name,
      status: val.status,
      species: val.species,
      type: val.type,
      gender: val.gender,
      image: val.image,
      url: val.url,
      created: new Date().toISOString().slice(0, 10),
    }).then(() => {
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html:
          "<i>El personaje  " +
          name +
          " fue agregado a favorito con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const limpiarCampos = () => {
    setName("");
    setStatus("");
    setSpecies("");
    setGender("");
    setType("");
    setUrl("");
    setImage("");
    setCreated("");
    setId("");
    setEditar(false);
  };

  const editFavorite = (val) => {
    setEditar(true);
    setName("");
    setStatus("");
    setSpecies("");
    setGender("");
    setType("");
    setUrl("");
    setImage("");
    setCreated("");
    setId(val.id);
  };

  const getCharacters = () => {
    Axios.get("https://rickandmortyapi.com/api/character").then((response) => {
      //console.log(response);
      setCharacters(response.data.results);
    });
  };

  const getFavorites = () => {
    Axios.get("http://localhost:3001/characters").then((response) => {
      setCharacters(response.data);
    });
  };

  useEffect(() => {
    if (isShowingFavorites) {
      getFavorites();
    } else {
      getCharacters();
    }
  }, [isShowingFavorites]);

  return (
    <div className="container">
      {isShowingFavorites && (
        <div className="card text-center">
          <div className="card-header">Characters Information</div>
          <div className="card-body">
            <div className="flex-col gap-2">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Name
                </span>
                <input
                  type="text"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  className="form-control"
                  value={name}
                  placeholder="Ingrese un nombre"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Status
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Status"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Species
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Species"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={species}
                  onChange={(event) => {
                    setSpecies(event.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Type
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={type}
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Gender
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingrese los Años"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={gender}
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Image
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Image"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={image}
                  onChange={(event) => {
                    setImage(event.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Url
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Url"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={url}
                  onChange={(event) => {
                    setUrl(event.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Created
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Created"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={created}
                  onChange={(event) => {
                    setCreated(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card-footer text-body-secondary">
            {editar ? (
              <div>
                <button
                  className="btn btn-warning m-2"
                  onClick={updateFavorite}
                >
                  Actualizar
                </button>
                <button className="btn btn-info" onClick={limpiarCampos}>
                  Cancelar
                </button>
              </div>
            ) : (
              <button className="btn btn-success" onClick={addFavorite}>
                Registrar
              </button>
            )}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setIsShowingFavorites(!isShowingFavorites);
        }}
        className="btn btn-info"
      >
        {isShowingFavorites ? "Listar Personajes" : "Ver Favoritos"}
      </button>
      <table className="table table-striped w-80">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Species</th>
            <th scope="col">Type</th>
            <th scope="col">Gender</th>
            <th scope="col">Image</th>
            <th scope="col">Url</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {charactersList.map((val, index) => {
            return (
              <tr key={index}>
                <th>{val.id}</th>
                <td>{val.name}</td>
                <td>{val.status}</td>
                <td>{val.species}</td>
                <td>{val.type}</td>
                <td>{val.gender}</td>
                <td>
                  <img src={val.image} alt="" className="img-thumbnail" />
                </td>
                <td>{val.url}</td>
                <td>{val.created}</td>
                <td>
                  <DropdownButton
                    as={ButtonGroup}
                    title="Options"
                    id="bg-nested-dropdown"
                  >
                    {isShowingFavorites ? (
                      <>
                        <Dropdown.Item eventKey="1">
                          <button
                            type="button"
                            onClick={() => {
                              editFavorite(val);
                            }}
                            className="btn btn-info dropdown-item"
                          >
                            Edit
                          </button>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                          <button
                            type="button"
                            onClick={() => {
                              deleteFavorite(val);
                            }}
                            className="btn btn-danger dropdown-item"
                          >
                            Delete
                          </button>
                        </Dropdown.Item>
                      </>
                    ) : (
                      <Dropdown.Item eventKey="2">
                        <button
                          type="button"
                          onClick={() => {
                            addToFavorites(val);
                          }}
                          className="btn btn-danger dropdown-item"
                        >
                          Add to Favorites
                        </button>
                      </Dropdown.Item>
                    )}
                  </DropdownButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default App;
