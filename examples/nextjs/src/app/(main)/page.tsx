
import { Button } from "rinjani-ui";

export default function Home() {
  return (
    <div>
      <div className="flex gap-4 mt-8">
        <Button color="primary" variant="filled">Primary Button</Button>
        <Button color="secondary" variant="outlined">Secondary Button</Button>
        <Button color="danger" variant="soft">Danger Soft</Button>
      </div>
    </div>
  );
}
