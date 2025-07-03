

const ForgotPassword =()=>
{
    return (
      <div className="w-screen lg:w-full h-screen flex items-center justify-center">
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              mutation.mutate(values, {
                onSettled: () => setSubmitting(false),
              });
            }}
          >
            {(formik) => {
              return (
                <div className="w-200 max-w-md mx-auto p-6 rounded   ">
                  <form
                    onSubmit={formik.handleSubmit}
                    className=" flex flex-col gap-8"
                  >
                    <Typography variant="h2" className="text-gray-600">
                      Login
                    </Typography>

                    <FormControl>
                      <TextField
                        className="w-full"
                        label="Email"
                        {...formik.getFieldProps("email")}
                      />
                    </FormControl>

                    <FormControl>
                      <TextField
                        className="w-full"
                        label="Password"
                        type="password"
                        {...formik.getFieldProps("password")}
                      />
                    </FormControl>
                    <p className="text-right">
                      <Link href="/forgotPassword">forgot password?</Link>&nbsp;
                    </p>
                    <Stack className="w-full justify-center items-center gap-2">
                      <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        style={{ backgroundColor: "#42cbf5" }}
                        disabled={formik.isSubmitting || mutation.isLoading}
                      >
                        {mutation.isLoading ? "submitting" : "submit"}
                      </Button>

                      <p>
                        Didn't have account?&nbsp;&nbsp;
                        <Link href="/register">Register here.</Link>
                      </p>
                    </Stack>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    );
}

export default ForgotPassword;