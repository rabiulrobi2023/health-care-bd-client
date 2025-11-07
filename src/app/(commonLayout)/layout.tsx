import PublicNavbar from "@/components/shared/PublicNavbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen px-2 md:px-0">
      <PublicNavbar />
      {children}
    </div>
  );
};

export default CommonLayout;
