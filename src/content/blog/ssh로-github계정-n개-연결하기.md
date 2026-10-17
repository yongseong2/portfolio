---
title: ssh로 github계정 n개 연결하기
description: ssh로 사용해본 github
date: '2024-12-12T05:09:58.499Z'
series: git
tags:
  - github
  - ssh
thumbnail: >-
  /assets/blog/0b9ce825-c2a5-4de9-b5cc-e37761775c1f.webp
---
> 매번 개인계정, 회사계정 직접 바꾸면서 쓰다가 ssh 등록하고 신세계를 경험함
안잊어먹으려고 기록

## 1. ssh-key 생성

### 1-1. .ssh 폴더 생성
우선 .ssh 폴더를 생성또는 유무 확인을 위해 root 디렉토리로 이동한다.
```bash
cd ~
```

이후 .ssh 폴더 유무 확인

```bash
ls -la ~/.ssh
```

없으면 .ssh 폴더 생성하면 된다
```
mkdir .ssh
```
이후 .ssh 폴더로 이동
```bash
cd .ssh
```
### 1-2. ssh-key 생성
이제 github와 연결할 공개키와 개인키를 만든다. 
내가 사용할 github계정의 n개 만큼 이메일과 키 이름을 같이 생성한다.

```bash
ssh-keygen -t rsa -C "user1@example.com" -f "id_rsa_user1"

ssh-keygen -t rsa -C "user2@example.com" -f "id_rsa_user2"
```

해당 명령어를 입력하게 되면 두가지 질문을 입력하게 되는데 둘다 Enter를 입력하면 된다. (비밀번호 입력하는 란인데 보안을 강화하고 싶으면 생성해도 된다.)

```
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

### 1-3. ssh-agent에 추가
ssh-agent를 백그라운드 실행해 놓고
```bash
eval "$(ssh-agent -s)"
```

추가한 계정 n개 만큼 ssh-agent에 추가한다.
```bash
ssh-add id_rsa_user1

ssh-add id_rsa_user2
```

해당 메시지가 나오면 성공
```
Identity added: id_rsa_user1 (user1@example.com)
Identity added: id_rsa_user2 (user2@example.com)
```

### 1-4. ssh config 설정
config 파일을 열고 아래 내용을 현재 계정에 맞게 n개 만큼 변경해서 입력한다.
```
vi config

or 

nano config
```

```
Host github.com-user1
    HostName github.com
    User user1
    IdentityFile ~/.ssh/id_rsa_user1

Host github.com-user2
    HostName github.com
    User user2
    IdentityFile ~/.ssh/id_rsa_user2
```

## 2. github에 공개키 설정

### 2-1. 공개키 복사
우선 공개키 파일을 열어서 내용을 복사한다. 나오는 내용을 복사후 `:qa`로 닫을 수 있다.

```bash
vi id_rsa_user1.pub
```

### 2-2. ssh-key 등록
Github에 로그인 후 상단 우측 프로필 이미지를 클릭 후 Settings로 들어간다.
![sidebar](/assets/blog/20ec2073-3c31-43c8-910b-9ac34662e17a.webp)

새로운 ssh keys를 등록하기 위해 `New SSH key` 클릭
![github-ssh](/assets/blog/83247740-d6dc-4b6a-aca9-0bf4bdbeda9b.webp)

 title은 원하는 이름으로 등록하고 `Key`에 복사한 내용을 붙여넣기 한다.
![ssh-create](/assets/blog/41304d9a-59dc-4131-a46f-83be0aadab92.webp)

### 2-3. ssh 연결 테스트
github와 연결됐는지 확인하기 위해 아래 명령어 입력
```
ssh -T git@github.com-user1
```

connect 여부를 물어보는 질문에 `yes`를 입력하고 해당 메시지가 나오면 성공
```
The authenticity of host 'github.com (IP)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Hi user1! You've successfully authenticated, but GitHub does not provide shell access.
```

## 3. 원격 레포지토리 연결

### 3-1. git clone
레포지토리 클론을 받기 위해서 해당 ssh 탭의 url을 복사후
![github-ssh-clone](/assets/blog/ee87b80d-af99-42a1-97ad-30e542fed892.webp)

github.com url의 이전 Host로 설정해던 이름으로 변경한 후 clone을 받으면 된다.

```
git clone git@github.com-user1:user1/example.git
```

### 3-2. https에서 ssh로 변경
현재 연결 되어있는 remote url 확인
```
git remote -v
```

이미 https로 연결된 주소를 바꾸고 싶다면 원하는 ssh주소로 변경 후 아래 명령어를 입력하면 된다.
```
git remote set-url origin git@github.com-user1:user1/example.git
 
git pull
```

### 3-3. 로컬 config 설정
로컬로 설정된 email과 name은  global보다 우선시 된다.

```
git config user.email user1@example.com

git config user.name user1
```

> 참고
- https://tiaz.dev/GitHub/1
- https://velog.io/@grr1203/%ED%95%9C-%EC%BB%B4%ED%93%A8%ED%84%B0%EC%97%90%EC%84%9C-Github-%EA%B3%84%EC%A0%95-%EC%97%AC%EB%9F%AC%EA%B0%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
