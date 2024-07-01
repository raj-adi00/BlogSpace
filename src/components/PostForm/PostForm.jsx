import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../Index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getFieldState, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })
    const navigate = useNavigate();
    const userdata = useSelector(state => state.auth.userData)
    const submit = async (data) => {
        if (post) {
            const file = data.featuredimage[0] ? await service.uploadFile(data.featuredimage[0]) : null
            if (file) {
                service.deleteFile(post.featuredimage)
            }
            const dbpost = await service.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined,
            })
            if (dbpost) {
                navigate(`/post/${dbpost.$id}`)
            }
        } else {
            const file = data.featuredimage[0] ? await service.uploadFile(data.featuredimage[0]) : null;
            console.log(file.$id)
            if (file) {
                if (file) {
                    const fileid = file.$id;
                    data.featuredimage = fileid;
                    const dbpost = await service.createPost({
                        ...data,
                        userid: userdata.$id,
                    })
                    if (dbpost) {
                        navigate(`/post/${dbpost.$id}`)
                    }
                }
            }
        }
    }
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                // .replace(/^[a-zA-X\d\s]+/g, '-')
                .replace(/\s/g, '-')

        }
        return ""
    }, [])
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredimage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilereview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm