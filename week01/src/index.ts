type MemberRole = "Web" | "Spring";

interface StudyMemberInterface {
  id: number;
  name: string;
  role: MemberRole;
  githubId?: string;
}

type StudyMember = {
  id: number;
  name: string;
  role: MemberRole;
  githubId?: string;
};

const members: StudyMember[] = [
  {
    id: 1,
    name: "가윤",
    role: "Web",
    githubId: "gayoon",
  },
  {
    id: 2,
    name: "민지",
    role: "Spring",
  },
];

function getMemberInfo(id: number): string {
  const member = members.find((member) => member.id === id);

  if (!member) {
    return `ID ${id}에 해당하는 회원을 찾을 수 없습니다.`;
  }

  const githubId = member.githubId ?? "등록되지 않음";

  return `이름: ${member.name}, 역할: ${member.role}, GitHub: ${githubId}`;
}

console.log(getMemberInfo(1));
console.log(getMemberInfo(2));
console.log(getMemberInfo(999));

const studyHour: number | undefined = 0;

console.log(studyHour || 1);
console.log(studyHour ?? 1);

function formatMemberId(input: unknown): string {
  if (typeof input === "number") {
    return `회원 ID: ${input}`;
  }

  if (typeof input === "string") {
    return `회원 ID: ${input}`;
  }

  return "올바르지 않은 회원 ID입니다.";
}

console.log(formatMemberId(1));
console.log(formatMemberId("2"));
console.log(formatMemberId(true));