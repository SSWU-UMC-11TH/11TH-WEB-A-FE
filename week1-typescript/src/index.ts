type memberRole = 'leader' | 'member';

type Member = {
  memberId: number;
  memberName: string;
  role: memberRole;
  githubId?: string;
};

const member1: Member = {
  memberId: 1,
  memberName: '채빈',
  role: 'member',
  githubId: '삔',
};
const member2: Member = {
  memberId: 2,
  memberName: '광수',
  role: 'leader',
  githubId: '꽝',
};
const member3: Member = {
  memberId: 3,
  memberName: '재석',
  role: 'member',
};
const members: Member[] = [member1, member2, member3];
function findMember(memberId: number) {
  const member = members.find((member) => member.memberId === memberId);
  if (!member) {
    return '존재하지 않는 회원입니다';
  }

  const github = member.githubId ?? ' 가 없음';
  return member.memberName + '/githubId ' + github;
}

console.log(findMember(1));
console.log(findMember(2));
console.log(findMember(3));
console.log(findMember(999));
