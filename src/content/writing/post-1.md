---
title: Shared remote development environment for a research lab
slug: shared-remote-development-environment-for-a-research-lab
excerpt: My recount on setting up a computational environment for our research group of 10 members. Most of the members are PhD students and postdocs. The goal was to let everyone have easily access to a powerful computational environment with simple setup so that they can focus on their research.
publishDate: 'June 20, 2024'
tags:
  - coder
  - docker
  - terraform
  - keycloak
  - freeipa
seo:
  image:
    src: '/post-1.jpg'
    alt: Coder infrastructure
---

## Backstory

When I was a graduate student, our lab had a couple of shared workstations that served as our computational backbone. All students in the lab relied on these machines to run their analyses and simulations. As was standard practice, we would connect to these workstations through SSH to execute our code.

This setup initially worked fairly well when we were a small group with only 2-3 students. As the group grew, we started running into issues with the shared workstations:

**User Management & Access**
- The onboarding process was time-consuming - each new member needed accounts set up on every workstation they would use
- External access required VPN, which our institution didn't provide for students.
This led to creating a proxy server outside the campus network to connect workstations
- We need to remember the IP address of each workstation to connect to it

**Data & Environment Management**
- Data sharing was inefficient since we don't have a shared network file server.
We used scp to transfer files between workstations and sometimes resorted to USB drives.
- It is difficult to share environments between workstations.
Replicating the same environment on different workstations was a manual process and can be time-consuming.
This is especially problematic when we have to make sure our analysis is reproducible.
- Some users are not familiar with Linux file permissions, which led to accidental sharing of their private data with others.

**Software & System Administration**
- Software installation was sometimes restricted due to the shared nature of the workstations.
If someone used a system-wide library when building their software, it could break their software when the library was updated.
- Each new workstation setup required repeating the same configuration process
- Deploying development servers, e.g., Jupyter notebooks, or web servers for demos, and share them with public was troublesome. We had to use third-party services like ngrok to expose the service to the internet, or set up reverse proxies outside the campus network.

**Resource Management**
- Individual users could monopolize system resources. This had caused us many problems as 
heavy workloads from one user could crash workstations and system crashes affected everyone's work simultaneously

That was a long list of issues, but they were all real problems that we faced. While our institution did have a high-performance computing cluster, it was not suitable for our use case. We needed to run interactive simulations and analysis, and the waiting time for students to get access to the cluster for an interactive session was prohibitively long.

## Solution

Last year, we happened to acquire two high-end servers for our lab, each with ~200 physical cores, 2TB of RAM, ~50TB of SSD storage, and several NVIDIA GPUs. We also had a network file server with ~300TB of storage.

As I was looking for a solution to the problems we faced with the shared workstations, I found Coder (https://coder.com), an open-source platform that allows you to create and manage development environments in the cloud or using your own servers. At that moment, I started building an infrastructure to solve the problems we faced with the shared workstations. At the end, the infrastructure looked like the following, and it has been working well for us for the past year.

![Infrastructure](/coder.png)

The key components of the infrastructure are:

**Coder**: I use Coder to create and manage development environments on our servers. On each server, I have a Docker service running, and Coder connects to the Docker service to create isolated development environments for each user.

**Nginx**: I use Nginx as a central reverse proxy to route traffic from the internet to coder instance running on the proxy server.
Nginx not only serves coder instances but also serves other services running on the servers.

**FreeIPA**: I use FreeIPA to manage user accounts, groups, and permissions. I have group such as **Interns**, **PhD Students**, **Admins**, etc., and I can easily manage permissions for each group.

**Keycloak**: I use Keycloak as an identity provider for Coder.
Keycloak is connected to FreeIPA, so when a user logs in to Coder, they are authenticated against FreeIPA.

**TrueNAS**: I use TrueNAS for our network file server.
This NFS is mounted on all servers, so we can easily share data between servers.

## Onboarding new members

When someone new joins the lab, I set up their FreeIPA account.
That's really all I need to do - it's that simple! I have docs ready that show them how to connect to Coder, use their favorite coding tools, run code on our servers, and fix common problems.

When someone leaves the lab, I just turn off their FreeIPA account.

## Connecting to the servers 

Our institution only lets us connect to servers from outside campus using http/https. Since Coder SSH routes everything through https and wss protocols to reach the Coder instance, we can easily connect from anywhere by pointing a domain to the proxy server. It works just like directly SSHing into the workspace.

We can use popular coding tools like VSCode and PyCharm to connect to the Coder workspace. We can run any web service on the workspace and forward ports to access it locally.

One great thing about Coder is how easy it is to share workspace ports online through the Coder interface. This means we can quickly make any workspace service available to everyone.

## Privacy and Data Sharing

When someone creates a Coder workspace, they get their own folder on the network drive if they don't have one already. This folder becomes their home directory across all their workspaces and environments. Only they can access their folder - it's completely private.

We have a shared folder called `/shared` on the network drive for sharing files between users. Students can share data by copying files there. The only downside is everyone can see the shared folder.

## Managing scientific environments and software

Each Coder workspace runs in its own Docker container on the server. Users have full control to install whatever they need, even if it needs admin access.

We typically use Conda to manage our environments. Since the home directory is shared, users can access their environments from any workspace. I've made some special workspace templates too - like one with a visual interface through VNC/XRDP, and another for running Docker inside the workspace.

## Managing resources

Since each workspace runs in Docker, I can control how much resources it uses. I've set limits on CPU and memory for each workspace so no single user can use everything up.

## Monitoring

The workspace user ID matches their FreeIPA ID, so it's easy to watch resource usage on the host server. I can use simple tools like htop, top, and ps to keep track.

## Conclusion

This shared development setup has totally transformed how our research group works. It fixes all the headaches we had with shared workstations.

Getting new people started is super quick, sharing data is straightforward, and managing software is simple. We can work from anywhere and easily share our work.

The best part? We can copy the whole setup to a new server just by installing Docker and connecting to Coder.

I'm really glad I found Coder and built this system for our lab. I hope this helps inspire you to create your own shared development environment!


