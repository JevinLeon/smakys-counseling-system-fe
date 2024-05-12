const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-4 ">
      <p className="text-muted-foreground">SMAKYS - Counseling System</p>
      <div className="text-9xl font-bold">OOPS!</div>
      <p className="text-muted-foreground">
        404 | The page you searched is not found.
      </p>
    </div>
  );
};

export default NotFoundPage;
