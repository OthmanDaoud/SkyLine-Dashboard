import React, { useEffect, useState } from "react";
import instance from "../../../firebase/instance";

const AddTicket = () => {
  const [data, setData] = useState({
    tripName: "",
    destination: "",
    StartDate: "",
    EndDate: "",
    arrivalTime: "",
    departureTime: "",
    description: "",
    flightNum: "",
    from: "",
    gate: "",
    price: "",
    priceVIP: "",
    reservedTicket: "",
    reservedTicketVip: "",
    deleted: 0,
  });

  const [tickets, setTickets] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlepost = (e) => {
    e.preventDefault();
    const postData = {
      tripName: data.tripName,
      destination: data.destination,
      StartDate: data.StartDate,
      EndDate: data.EndDate,
      arrivalTime: data.arrivalTime,
      departureTime: data.departureTime,
      description: data.description,
      flightNum: data.flightNum,
      from: data.from,
      gate: data.gate,
      price: data.price,
      priceVIP: data.priceVIP,
      reservedTicket: data.reservedTicket,
      reservedTicketVip: data.reservedTicketVip,
      deleted: 0,
    };

    instance
      .put(`/trips/Trips/${tickets.length}.json`, postData)
      .then((res) => {
        console.log(res);
        const updatedTickets = [...tickets, { ...postData, id: res.data.name }];
        setData({
          tripName: "",
          destination: "",
          StartDate: "",
          EndDate: "",
          arrivalTime: "",
          departureTime: "",
          description: "",
          flightNum: "",
          from: "",
          gate: "",
          price: "",
          priceVIP: "",
          reservedTicket: "",
          reservedTicketVip: "",
          deleted: 0,
        });
        setTickets(updatedTickets);
      });
  };

  useEffect(() => {
    instance.get("/trips/Trips.json").then((res) => {
      const fetchData = [];
      for (let key in res.data) {
        fetchData.push({ ...res.data[key], id: key });
      }
      setTickets(fetchData);
    });
  }, []);

  const handleRemove = async (id) => {
    try {
      const ticketToPatch = tickets.find((ticket) => ticket.id === id);
      if (ticketToPatch) {
        await instance.patch(`/trips/Trips/${id}.json`, { deleted: 1 });
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === id ? { ...ticket, deleted: 1 } : ticket
          )
        );
      } else {
        console.error("Ticket not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (ticketId) => {
    try {
      const ticketToUpdate = tickets.find((ticket) => ticket.id === ticketId);
      if (ticketToUpdate) {
        const newTripName = prompt(
          "Enter new Trip Name",
          ticketToUpdate.tripName
        );
        const newDestination = prompt(
          "Enter new Destination",
          ticketToUpdate.destination
        );
        const newStartDate = prompt(
          "Enter new Start Date",
          ticketToUpdate.StartDate
        );
        const newEndDate = prompt("Enter new End Date", ticketToUpdate.EndDate);
        const newArrivalTime = prompt(
          "Enter new Arrival Time",
          ticketToUpdate.arrivalTime
        );
        const newDepartureTime = prompt(
          "Enter new Departure Time",
          ticketToUpdate.departureTime
        );
        const newDescription = prompt(
          "Enter new Description",
          ticketToUpdate.description
        );
        const newFlightNum = prompt(
          "Enter new Flight Number",
          ticketToUpdate.flightNum
        );
        const newFrom = prompt("Enter new From", ticketToUpdate.from);
        const newGate = prompt("Enter new Gate", ticketToUpdate.gate);
        const newPrice = prompt("Enter new Price", ticketToUpdate.price);
        const newPriceVIP = prompt(
          "Enter new Price VIP",
          ticketToUpdate.priceVIP
        );
        const newReservedTicket = prompt(
          "Enter new Reserved Ticket",
          ticketToUpdate.reservedTicket
        );
        const newReservedTicketVip = prompt(
          "Enter new Reserved Ticket Vip",
          ticketToUpdate.reservedTicketVip
        );

        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  tripName: newTripName,
                  destination: newDestination,
                  StartDate: newStartDate,
                  EndDate: newEndDate,
                  arrivalTime: newArrivalTime,
                  departureTime: newDepartureTime,
                  description: newDescription,
                  flightNum: newFlightNum,
                  from: newFrom,
                  gate: newGate,
                  price: newPrice,
                  priceVIP: newPriceVIP,
                  reservedTicket: newReservedTicket,
                  reservedTicketVip: newReservedTicketVip,
                }
              : ticket
          )
        );

        await instance.put(`/trips/Trips/${ticketId}.json`, {
          tripName: newTripName,
          destination: newDestination,
          StartDate: newStartDate,
          EndDate: newEndDate,
          arrivalTime: newArrivalTime,
          departureTime: newDepartureTime,
          description: newDescription,
          flightNum: newFlightNum,
          from: newFrom,
          gate: newGate,
          price: newPrice,
          priceVIP: newPriceVIP,
          reservedTicket: newReservedTicket,
          reservedTicketVip: newReservedTicketVip,
        });

        console.log(
          "Updated ticket:",
          newTripName,
          newDestination,
          newStartDate,
          newEndDate,
          newArrivalTime,
          newDepartureTime,
          newDescription,
          newFlightNum,
          newFrom,
          newGate,
          newPrice,
          newPriceVIP,
          newReservedTicket,
          newReservedTicketVip
        );
      } else {
        console.error("Ticket not found");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-full sm:max-w-3xl md:max-w-4xl">
        <form onSubmit={handlepost}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label
                htmlFor="tripName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Trip Name
              </label>
              <input
                type="text"
                id="tripName"
                name="tripName"
                value={data.tripName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Trip Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="destination"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={data.destination}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Destination"
                required
              />
            </div>
            <div>
              <label
                htmlFor="StartDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Start Date
              </label>
              <input
                type="date"
                id="StartDate"
                name="StartDate"
                value={data.StartDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="EndDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                End Date
              </label>
              <input
                type="date"
                id="EndDate"
                name="EndDate"
                value={data.EndDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="arrivalTime"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Arrival Time
              </label>
              <input
                type="text"
                id="arrivalTime"
                name="arrivalTime"
                value={data.arrivalTime}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Arrival Time"
              />
            </div>
            <div>
              <label
                htmlFor="departureTime"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Departure Time
              </label>
              <input
                type="text"
                id="departureTime"
                name="departureTime"
                value={data.departureTime}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Departure Time"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={data.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Description"
              />
            </div>
            <div>
              <label
                htmlFor="flightNum"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Flight Number
              </label>
              <input
                type="text"
                id="flightNum"
                name="flightNum"
                value={data.flightNum}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Flight Number"
              />
            </div>
            <div>
              <label
                htmlFor="from"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                From
              </label>
              <input
                type="text"
                id="from"
                name="from"
                value={data.from}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter From"
              />
            </div>
            <div>
              <label
                htmlFor="gate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Gate
              </label>
              <input
                type="text"
                id="gate"
                name="gate"
                value={data.gate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Gate"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={data.price}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Price"
              />
            </div>
            <div>
              <label
                htmlFor="priceVIP"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price VIP
              </label>
              <input
                type="text"
                id="priceVIP"
                name="priceVIP"
                value={data.priceVIP}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Price VIP"
              />
            </div>
            <div>
              <label
                htmlFor="reservedTicket"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Reserved Ticket
              </label>
              <input
                type="text"
                id="reservedTicket"
                name="reservedTicket"
                value={data.reservedTicket}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Reserved Ticket"
              />
            </div>
            <div>
              <label
                htmlFor="reservedTicketVip"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Reserved Ticket VIP
              </label>
              <input
                type="text"
                id="reservedTicketVip"
                name="reservedTicketVip"
                value={data.reservedTicketVip}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Reserved Ticket VIP"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm py-2 px-5 w-full sm:w-auto"
          >
            Add Ticket
          </button>
        </form>

        <div className="mt-8">
          {tickets
            .filter((ticket) => ticket.deleted === 0)
            .map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-4 my-4 rounded-lg shadow-lg"
              >
                <h1 className="text-lg font-medium text-gray-900">
                  {ticket.tripName}
                </h1>
                <p className="text-sm text-gray-700">{ticket.destination}</p>
                <p className="text-sm text-gray-700">
                  Start Date: {ticket.StartDate}
                </p>
                <p className="text-sm text-gray-700">
                  End Date: {ticket.EndDate}
                </p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 mr-2"
                  onClick={() => handleRemove(ticket.id)}
                >
                  Remove
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
                  onClick={() => handleUpdate(ticket.id)}
                >
                  Update
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddTicket;

// import React, { useEffect, useState } from "react";
// import instance from "../../../firebase/instance";

// const AddTicket = () => {

//   const[data , setData] = useState({
//     tripName : "" ,
//     destination : "" ,
//     StartDate : "" ,
//     EndDate : "" ,
//     deleted : 0 ,

//   })

//   const [tickets, setTickets] = useState([]);

//   const handleChange = e =>{

//     // retriave the data e.target.name or .value
//     const { name, value } = e.target;
//        // function call back to save last update after rendering and store data
//        setData((prevData) => ({
//         ...prevData ,
//         [name]: value,
//         //name from name in const{name , value} = e.target ;

//        }));

//     };

//   // post Data to fire base
//   const handlepost = e =>{
//     e.preventDefault()
//     const postData = {

//     arrivalTime : data.arrivalTime ,
//     departureTime : data.departureTime,
//     description : data.description,
//     destination : data.destination,
//     flightNum : data.flightNum ,
//     from : data.flightNum ,
//     gate : data.gate ,
//     price : data.price ,
//     priceVIP : data.price ,
//     reservedTicket : data.reservedTicket,
//     reservedTicketVip : data.reservedTicketVip ,

//         tripName : data.tripName ,
//         StartDate : data.StartDate ,
//         EndDate: data.EndDate ,
//         deleted : 0 ,

//     }

//     instance.post(`/trips/Trips.json` , postData ).then(res =>{
//         console.log(res) ;
//         // to handle update in websit
//             // and when we do new suubmition
//             // to update my data on screen
//             // we do this
//             const updatedTickets = [
//                 ...tickets ,
//                 {postData , id : res.data.name}
//             ];
//             setData({
//               arrivalTime : "" ,
//               departureTime : "",
//               description : "",
//               destination : "",
//               flightNum : "" ,
//               from : "" ,
//               gate : "" ,
//               price : "" ,
//               priceVIP : "" ,
//               reservedTicket : "",
//               reservedTicketVip : "" ,
//                 deleted : 0 ,

//             })
//             setTickets(updatedTickets);

//         });

//   };

//   // Function get data in catalog page :

// useEffect(()=>{
//     instance.get("/trips/Trips.json").then(res =>{
//         const fetchData = [] ;
//         for(let key in res.data){
//             fetchData.push({...res.data[key] , id : key})
//         }

//         setTickets(fetchData)
//     })
// },[])

//   // Handle Remove
//   const handleRemove = async (id) => {
//     try {
//       const ticketToPatch = tickets.find((ticket) => ticket.id === id);

//       if (ticketToPatch) {
//         await instance.patch(`/trips/Trips/${id}.json`, {
//             deleted: 1, });
//         setTickets((prevTickets) =>prevTickets.map((ticket) =>
//             ticket.id === id ? { ...ticket, deleted: 1 } : ticket
//      )
//         );
//       } else {
//         console.error("Ticket not found");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

// // handle update
// const handleUpdate = async (ticketId) => {
//     try {
//       const ticketToUpdate = tickets.find(ticket => ticket.id === ticketId);

//       if (ticketToUpdate) {
//         const newTripName = prompt("Enter new Trip Name", ticketToUpdate.tripName);
//         const newDestination = prompt("Enter new Destination", ticketToUpdate.destination);
//         const newStartDate = prompt("Enter new Start Date", ticketToUpdate.StartDate);
//         const newEndDate = prompt("Enter new End Date", ticketToUpdate.EndDate);

//         // Update the state with new values
//         setTickets(prevTickets =>
//           prevTickets.map(ticket =>
//             ticket.id === ticketId
//               ? {
//                   ...ticket,
//                   tripName: newTripName,
//                   destination: newDestination,
//                   StartDate: newStartDate,
//                   EndDate: newEndDate,
//                 }
//               : ticket
//           )
//         );

//         // Update the database with new values
//         await instance.put(`/trips/Trips/${ticketId}.json`, {
//           tripName: newTripName,
//           destination: newDestination,
//           StartDate: newStartDate,
//           EndDate: newEndDate,
//         });

//         console.log("Updated ticket:", newTripName, newDestination, newStartDate, newEndDate);
//       } else {
//         console.error("Ticket not found");
//       }
//     } catch (error) {
//       console.error("Error updating ticket:", error);
//     }
//   };

//   return (
//     <div className="bg-lightBlue">
//         <div className="w-3/4 flex justify-center mx-auto">
//       <form onSubmit={handlepost} className="bg-slate-400 w-3/4 flex justify-center mx-auto">
//         <div className="input">
//           <label htmlFor="trip-name">Trip Name:</label>
//           <input
//             type="text"
//             id="trip-name"
//             name="tripName"
//             required
//             onChange={handleChange}
//             className="border-2"
//             value={data.destination}
//           />
//         </div>

//         <div className="input">
//           <label htmlFor="destination">Destination:</label>
//           <input
//             type="text"
//             id="destination"
//             name="destination"
//             required
//             onChange={handleChange}
//             className="border-2"
//             value={data.arrivalTime}
//           />
//         </div>

//         <div className="input">
//           <label htmlFor="StartDate">Start Date:</label>
//           <input
//             type="date"
//             id="StartDate"
//             name="StartDate"
//             required
//             onChange={handleChange}
//             className="border-2"
//             value={data.StartDate}
//           />
//         </div>

//         <div className="input">
//           <label htmlFor="EndDate">End Date:</label>
//           <input
//             type="date"
//             id="EndDate"
//             name="EndDate"
//             required
//             onChange={handleChange}
//             className="border-2"
//             value={data.EndDate}
//           />
//         </div>

//         <input type="submit" value="Add Ticket" />
//       </form>
//       </div>

//       <div>
//         {tickets
//           .filter((ticket) => ticket.deleted === 0)
//           .map((ticket) => (
//             <div key={ticket.id}>
//               <h1>{ticket.tripName}</h1>
//               <h1>{ticket.destination}</h1>
//               <h1>{ticket.StartDate}</h1>
//               <h1>{ticket.EndDate}</h1>
//               <button
//                 className="bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
//                 onClick={() => handleRemove(ticket.id)}
//               >
//                 Remove
//               </button>
//               <button
//                 className="bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
//                 onClick={() => handleUpdate(ticket.id)}
//               >
//                 update
//               </button>
//             </div>
//           ))}
//       </div>

//     </div>
//   );
// };

// export default AddTicket;
