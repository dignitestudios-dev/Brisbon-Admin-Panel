import { useState, useEffect } from "react";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import { processError } from "../../lib/utils";



export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalServices: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/admin/dashboard');
        
        // Check if the response is successful
        if (response.data.success) {
          setStats({
            totalBookings: response.data.data.totalbooking.value,
            totalServices: response.data.data.totalService.value,
          });
        } else {
          setError('Failed to fetch dashboard stats');
        }
      } catch (err) {
        setError('Error fetching dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return { stats, loading, error };
};


const useUsers = (currentPage = 1) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});

  const getUsers = async () => {
    try {
      setLoading(true);

      // Construct API URL with pagination
      const query = `?page=${currentPage}&pageSize=10`;
  
      const { data } = await axios.get(`/admin/user${query}`);
  
      if (data.success) {
        setUsers(data.data); // Set the user data
        setPagination(data.paginationDetails); // Set pagination details
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]); // Re-run when page changes

  return { loading, users, pagination };
};


export { useUsers };


export const useUserProfileDetails = (id) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfileDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/admin/user/${id}`);
        if (response.data.success) {
          setUser(response.data.data.user);
          setBookings(response.data.data.booking); // Assuming booking data is also part of the response
        }
      } catch (err) {
        setError("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserProfileDetails();
    }
  }, [id]);

  return { user, bookings, loading, error };
};



const useServices = (url, currentPage = 1) => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [pagination, setPagination] = useState({});

  const getServices = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}?page=${currentPage}`);
      
      if (data?.success) {
        setServices(data?.data); 
        setPagination(data?.pagination); 
      }
    } catch (error) {
      processError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, [currentPage]);

  return { loading, services, pagination };
};

export { useServices };



export const useServiceDetails = (id,update) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/service/${id}`);
        setService(response.data.data);
      } catch (err) {
        setError('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServiceDetails();
    }
  }, [id,update]);

  return { service, loading, error };
};



// Custom hook to fetch reviews for a service
const useServiceReviews = (id) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);

  useEffect(() => {
    if (!id) return;  // If id is not available, do nothing

    setReviewsLoading(true);
    setReviewsError(null);

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/booking/reviews/${id}`);
        if (response?.data?.success) {
          setReviews(response?.data?.data?.reviews || []);  // Set reviews if the response is successful
        } else {
          setReviewsError('Failed to fetch reviews.');
        }
      } catch (err) {
        setReviewsError('Error fetching reviews.');
      } finally {
        setReviewsLoading(false);  // Set loading to false when the API call completes
      }
    };

    fetchReviews();  // Fetch reviews when the `id` changes

  }, [id]);

  return { reviews, reviewsLoading, reviewsError };
};

export { useServiceReviews };




const useBookings = (url, session, status, currentPage = 1, pageSize = 10) => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({});

  const getBookings = async () => {
    try {
      setLoading(true);

      let query = `?page=${currentPage}&pageSize=${pageSize}`;
      if (session) query += `&session=${session}`;
      if (status) query += `&status=${status}`;

      const { data } = await axios.get(`${url}${query}`);
      
      console.log("API Response Data:", data.data); // Log the full response to check pagination

      if (data?.success) {
        setBookings(data.data.data || []);
        setPagination(data.data.paginationDetails || {});
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, [url, session, status, currentPage, pageSize]);

  return { loading, bookings, pagination };
};

export { useBookings };







export const useBookingDetails = (id) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/booking/${id}`);
        setBooking(response.data.data);
      } catch (err) {
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookingDetails();
    }
  }, [id]);

  return { booking, loading, error };
};


const useReports = (url, session, currentPage = 1) => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState({});

  const getReports = async () => {
    try {
      setLoading(true);

      // Query with filters
      let query = `?page=${currentPage}`;
      if (session) query += `&status=${session}`; // Filter by status ("underreview" or "resolved")

      const { data } = await axios.get(`${url}${query}`);

      if (data?.success) {
        setReports(data?.data?.data); // Set reports data
        setPagination(data?.data?.paginationDetails); // Set pagination details
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, [session, currentPage]); // Add session and currentPage to dependency array

  return { loading, reports, pagination };
};

export { useReports };




const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
  });

  const fetchReviews = async (page = 1) => {
    setReviewsLoading(true);
    setReviewsError(null);

    try {
      const response = await axios.get(`/booking/reviews?page=${page}&pageSize=10`);
      if (response?.data?.success) {
        setReviews((prevReviews) => 
          page === 1 ? response.data.data.reviews : [...prevReviews, ...response.data.data.reviews]
        );
        setPagination(response.data.data.paginationDetails);
      } else {
        setReviewsError("Failed to fetch reviews.");
      }
    } catch (err) {
      setReviewsError("Error fetching reviews.");
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1); // Initial fetch for page 1
  }, []);

  const loadMoreReviews = () => {
    if (pagination.hasNextPage) {
      fetchReviews(pagination.currentPage + 1);
    }
  };

  return { reviews, reviewsLoading, reviewsError, loadMoreReviews, pagination };
};

export { useReviews };



export const useReportDetails = (id) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/booking/reports/${id}`);
        setReport(response.data.data);
      } catch (err) {
        setError('Failed to load report details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReportDetails();
    }
  }, [id]);

  return { report, loading, error };
};




// hooks/useChats.js

const useChats = (currentPage = 1) => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [pagination, setPagination] = useState({});

  const getChats = async () => {
    try {
      setLoading(true);
      const query = `?page=${currentPage}&pageSize=10`;
      const { data } = await axios.get(`/admin/chats${query}`);

      if (data.success) {
        setChats(data.data);
        setPagination(data.paginationDetails || {});
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChats();
  }, [currentPage]);

  return { loading, chats, pagination };
};

export { useChats };



