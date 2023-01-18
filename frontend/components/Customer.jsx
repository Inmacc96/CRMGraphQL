const Customer = ({ customer }) => {
  const { name, surname, company, email } = customer;

  return (
    <tr>
      <td className="border px-4 py-2">
        {name} {surname}
      </td>
      <td className="border px-4 py-2">{company}</td>
      <td className="border px-4 py-2">{email}</td>
    </tr>
  );
};

export default Customer;
