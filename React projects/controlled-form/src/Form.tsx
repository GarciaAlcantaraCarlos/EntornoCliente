import { useState } from "react";

export default function FormularioControlado() {
    const [form, setForm] = useState({
      name: '',
      age: 0,
      email: '',
      passwd: '',
    });

    // Variable de estado con los mensajes de error, para dirigirlos

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      // Map validar item:func
      setForm({
        ...form,
        [name]: value
      });
    };

    // Objeto de validaciones con funciones validadoras

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', form);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="name">Nombre: </label></td>
            <td><input name="name" id="name" type="text" minLength={3} maxLength={50} value={form.name} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label htmlFor="age">Edad: </label></td>
            <td><input name="age" id="age" type="number" min={0} max={120} value={form.age} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label htmlFor="email">Email: </label></td>
            <td><input name="email" id="email" type="email" value={form.email} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label htmlFor="passwd">Contraseña: </label></td>
            <td><input name="passwd" id="passwd" type="password" value={form.passwd} onChange={handleChange} /></td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Registrar usuario</button>
    </form>
  )
}