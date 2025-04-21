#include <stdio.h>
#define max=15;
int cqueue_arr[max];
int front=-1,num;
int rear=-1;
void enqueue(int num){
    if((front==0 && rear==max-1)|| (front ==rear+1)){
        printf("queue is full");
        return;
    }
    if (front==-1){
        front=0;
        rear=0;
    }
    else{
        if(rear== max-1)
        rear=0;
        else
        rear=rear+1;
    }
    cqueue_arr[rear]=num;
    void dequeue ()
    {
        if(front==-1){
            printf("queue is empty");
            return;
        }
        printf("the dequeued element is : %d", cqueue_arr[front]);
        if(front==rear){
            front=-1;
            rear=-1;

        }
        else{
            if(front==max-1)
            front=0;
            else
            front=front+1;
        }

    }
    void display()
    {
        int front_pos=front,rear_pos=rear;
        if (front==-1)
        {
            printf("queue is empty");
            return
        }
        printf("queue elements : n");
        if (front_pos<=rear_pos)
        while (front_pos<=rear_pos)
        {
            printf("%d",cqueue_arr[front_pos]);
            front_pos++;
        }
        else{
            while (front_pos<=max-1){
                printf("%d",cqueue_arr[front_pos]);
                front_pos++;
            }
            front_pos=0
            while(front_pos<=rear_pos)
            {
                printf("%d",cqueue_arr[front_pos]);
                front_pos++;
            }
        }
        printf("n")
    }
    void sizeof()
    {
        if(rear>=front)
        sizeof queue=rear-front+1;
    }
    void head_queue()  
    if (front==-1)
        {
            printf("queue is empty");
         } else
            return cqueue_arr[front];
void end_queue()
 if (front==-1)
        {
            printf("queue is empty");
        }
        else{
        return cqueue_arr[rear];
}
int main()
{
    int choice,n,num;
   // printf("enter the maximum length of your array",)
   do{
    printf("\n 1.enqueue \n 2. dequeue \n .3 display \n 4. sizeof \n 5. head_queue \n 6. end_queue\n 7. exit \n");
    printf("enter your choice:");
    scanf("%d",choice);
    switch(choice)
    {
        case 1 :
        printf(" input the element to be enqueue :");
        scanf("%d",&num);
        insert(num);
        break;
        case 2:
        dequeue();
        break;
        case 3:
        display();
        break;
        case 4:
        sizeof();
        break;
        case 5:
        head_queue();
        break;
        case 6:
        end_queue;
        break;
        case 7:
        exit ;
        break;
        default :
        printf("wrong choice");
    }

    }
    while(choice!= 7);
    return 0;

    
}



