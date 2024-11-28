import { AiOutlineFile, AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { FaHeading, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { ImParagraphLeft } from "react-icons/im";
import { RiCodeBoxLine } from "react-icons/ri";
import { FaYoutube, FaTrello, FaSoundcloud, FaDribbble } from 'react-icons/fa';
import { SiFramer, SiGoogledocs, SiGooglesheets, SiGoogleforms, SiGoogleslides } from 'react-icons/si';

import { 
   AiOutlinePicture, AiOutlineLink, 
  AiOutlineTable, AiOutlineBlock, 
  AiOutlineAppstore, AiOutlineCalculator 
} from 'react-icons/ai';
import { FaGithub, FaGitlab, FaJira } from 'react-icons/fa';
import { SiFigma, SiLinear, SiFormspree, SiApplearcade } from 'react-icons/si';
import { PiTabsFill } from "react-icons/pi";

export const initialOptions = [
  { label: "Paragraph", icon: <ImParagraphLeft /> },
  { label: "Heading 1", icon: <FaHeading /> },
  { label: "Heading 2", icon: <FaHeading /> },
  { label: "Heading 3", icon: <FaHeading /> },
  { label: "Unordered list", icon: <AiOutlineUnorderedList /> },
  { label: "Ordered list", icon: <AiOutlineOrderedList /> },
  { label: "Hint", icon: <BiTask /> },
  { label: "Task List", icon: <BiTask /> },
  { label: "Quote", icon: <FaQuoteLeft /> },
  { label: "Divider", icon: <RiCodeBoxLine /> },
  { label: "Code block", icon: <RiCodeBoxLine /> },
];

export const advancedOptions = [
  { label: 'Insert files', icon: <AiOutlineFile /> },
  { label: 'Insert Images', icon: <AiOutlinePicture /> },
  { label: 'Embed Url', icon: <AiOutlineLink /> },
  { label: 'Table', icon: <AiOutlineTable /> },
  { label: 'Cards', icon: <AiOutlineBlock /> },
  { label: 'Expandable', icon: <AiOutlineAppstore /> },
  { label: 'Tabs', icon: <PiTabsFill /> },
  { label: 'Stepper', icon: <AiOutlineAppstore /> },
  { label: 'Drawing', icon: <AiOutlineCalculator /> },
  { label: 'Math & Tex', icon: <AiOutlineCalculator /> },
  { label: 'Open API', icon: <AiOutlineAppstore /> },
  { label: 'Page link', icon: <AiOutlineLink /> },
  { label: 'Snippet', icon: <AiOutlineBlock /> }
];

export const discoverIntegration = [
  { label: 'Arcade', icon: <SiApplearcade /> },
  { label: 'Figma', icon: <SiFigma /> },
  { label: 'Github Files', icon: <FaGithub /> },
  { label: 'GitLab Files', icon: <FaGitlab /> },
  { label: 'Guide flow', icon: <AiOutlineAppstore /> },
  { label: 'Guide jar', icon: <AiOutlineAppstore /> },
  { label: 'HowdyGo', icon: <AiOutlineAppstore /> },
  { label: 'Jira', icon: <FaJira /> },
  { label: 'Linear', icon: <SiLinear /> }
];


export const EmbedsWithIcons = [
  { label: 'Youtube', icon: <FaYoutube /> },
  { label: 'Trello', icon: <FaTrello /> },
  { label: 'Soundcloud', icon: <FaSoundcloud /> },
  { label: 'Github Gist', icon: <FaGithub /> },
  { label: 'Framer', icon: <SiFramer /> },
  { label: 'Dribble', icon: <FaDribbble /> },
  { label: 'Typeform', icon: <SiGoogleforms /> },
  { label: 'Google Docs', icon: <SiGoogledocs /> },
  { label: 'Google Sheets', icon: <SiGooglesheets /> },
  { label: 'Google Form', icon: <SiGoogleforms /> },
  { label: 'Google Slides', icon: <SiGoogleslides /> },
];