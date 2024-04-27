import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip,
} from "recharts";
import PropTypes from 'prop-types';

import MoneyIcon from 'public/images/e-commerce/admin/widgets/moneyIcon';
import s from './Dashboard.module.scss';

const SimpleLine = ({ color, title, subtitle, value }) => {


  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUsersData(data); // Assuming data is an array fetched from the API
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);

    // // Mock data for demonstration
    // const randomData = React.useMemo(() => {
    //     return Array.from({ length: value }, (_, index) => ({
    //         name: `Day ${index + 1}`,
    //         value: Math.floor(Math.random() * 100) // Replace this with your actual data
    //     }));
    // }, [value]);

    return (
      <div className={s.dashboardWidgetWrapper}>
      <h4 className={s.widgetTitle}>{title}</h4>
      <span className={s.widgetSubtitle}>{subtitle}</span>
      <div>
          <MoneyIcon className={s.moneyIcon} />
          <ResponsiveContainer height={90} width="100%">
              <AreaChart data={value}>
                  <Area
                      type="natural"
                      dataKey="value"
                      stroke={color}
                      fill={color}
                      strokeWidth={3}
                      fillOpacity="0.1"
                  />
                  <Tooltip />
              </AreaChart>
          </ResponsiveContainer>
      </div>
  </div>
    );
}

SimpleLine.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  value: PropTypes.array,
}

// export async function getServerSideProps(context) {
//     try {
//         const res = await fetch("http://localhost:8080/api/users/");
//         if (!res.ok) {
//             throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();

//         return {
//             props: {
//                 usersData: data.length, // Pass the length of the user data array
//             },
//         };
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         return {
//             props: {
//                 usersData: 0, // Set to 0 if there's an error
//             },
//         };
//     }
// }

export default SimpleLine;
