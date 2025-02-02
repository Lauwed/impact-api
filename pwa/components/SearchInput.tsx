import Button from "./Button";
import Input from "./form/Input";

const SearchInput = () => {
  return (
    <form className="flex items-center ml-auto">
      <label htmlFor="search" className="mr-4">
        Research
      </label>
      <Input type="search" id="search" name="search" />
      <Button>Submit</Button>
    </form>
  );
};

export default SearchInput;
