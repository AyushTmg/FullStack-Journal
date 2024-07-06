import CreateIcon from "../../../assets/createIcon.svg";
import "./CreateJournal.css";
export default function CreateJournal() {
  return (
    <div className="createJour-container">
      <img src={CreateIcon} alt="Create Journal" />
      <p>Create Journal</p>
    </div>
  );
}
