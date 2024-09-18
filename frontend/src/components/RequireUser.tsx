import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';
import { userApi } from '@/features/user/userApi';

const RequireUser = ({ allowedRoles, children }: { allowedRoles: string[], children: React.ReactNode }) => {
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data!,
  });

  console.log({ loading });
  if (loading) {
    return <div className='text-center fz20'>
      LOADING...
    </div>;
  }
  
  return (cookies.logged_in || user) &&
    allowedRoles.includes(user?.role as string) ? (
    <>{children}</>
  ) : cookies.logged_in && user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireUser;
