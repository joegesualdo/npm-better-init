export default function getFileNameFromPath(projectPath) {
  let fileName = '';
  if (projectPath[projectPath.length - 1] === '/') {
    fileName = projectPath.substring(0, projectPath.length - 1);
  } else {
    fileName = projectPath.split('/').pop();
  }
  return fileName;
}

